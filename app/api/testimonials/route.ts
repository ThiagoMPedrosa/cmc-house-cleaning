import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const connectionString = process.env.DATABASE_URL!
const sql = neon(connectionString)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = Number.parseInt(
      searchParams.get("page") || "1"
    )

    const limit = Number.parseInt(
      searchParams.get("limit") || "6"
    )

    const offset = (page - 1) * limit

    // Get total count
    const countResult =
      await sql`SELECT COUNT(*) FROM testimonials`

    const totalTestimonials =
      Number(countResult[0].count)

    const totalPages =
      Math.ceil(totalTestimonials / limit)

    // Get testimonials with pagination, newest first
    const testimonials = await sql`
      SELECT id, name, text, date
      FROM testimonials
      ORDER BY date DESC, id DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    return NextResponse.json({
      testimonials,
      pagination: {
        currentPage: page,
        totalPages,
        totalTestimonials,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    return NextResponse.json({
      testimonials: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalTestimonials: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      text,
      captchaToken,
    } = await request.json()

    // -------------------------
    // 1. Validate input
    // -------------------------

    if (!name || !text) {
      return NextResponse.json(
        {
          error:
            "Name and testimonial text are required",
        },
        {
          status: 400,
        }
      )
    }

    if (!captchaToken) {
      return NextResponse.json(
        {
          error:
            "Please complete the verification.",
        },
        {
          status: 400,
        }
      )
    }

    // -------------------------
    // 2. Get Turnstile secret
    // -------------------------

    const secretKey =
      process.env.TURNSTILE_SECRET_KEY

    if (!secretKey) {
      console.error(
        "TURNSTILE_SECRET_KEY is not configured"
      )

      return NextResponse.json(
        {
          error: "Server configuration error",
        },
        {
          status: 500,
        }
      )
    }

    // -------------------------
    // 3. Verify with Cloudflare
    // -------------------------

    const verificationResponse =
      await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            secret: secretKey,
            response: captchaToken,
          }),
        }
      )

    const verification =
      await verificationResponse.json()

    if (!verification.success) {
      console.log(
        "Turnstile verification failed:",
        verification["error-codes"]
      )

      return NextResponse.json(
        {
          error:
            "CAPTCHA verification failed. Please try again.",
        },
        {
          status: 403,
        }
      )
    }

    // -------------------------
    // 4. CAPTCHA PASSED
    // -------------------------

    const result = await sql`
      INSERT INTO testimonials (name, text, date)
      VALUES (${name}, ${text}, CURRENT_DATE)
      RETURNING id, name, text, date
    `

    const newTestimonial = result[0]

    return NextResponse.json(
      newTestimonial,
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error(
      "Error saving testimonial:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to save testimonial",
      },
      {
        status: 500,
      }
    )
  }
}