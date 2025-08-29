import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const connectionString = process.env.DATABASE_URL!
const sql = neon(connectionString)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "6")
    const offset = (page - 1) * limit

    // Get total count
    const countResult = await sql`SELECT COUNT(*) FROM testimonials`
    const totalTestimonials = Number(countResult[0].count)
    const totalPages = Math.ceil(totalTestimonials / limit)

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
    const { name, text } = await request.json()

    if (!name || !text) {
      return NextResponse.json({ error: "Name and testimonial text are required" }, { status: 400 })
    }

    // Insert testimonial into Neon Postgres
    const result = await sql`
      INSERT INTO testimonials (name, text, date)
      VALUES (${name}, ${text}, CURRENT_DATE)
      RETURNING id, name, text, date
    `
    const newTestimonial = result[0]

    return NextResponse.json(newTestimonial, { status: 201 })
  } catch (error) {
    console.error("Error saving testimonial:", error)
    return NextResponse.json({ error: "Failed to save testimonial" }, { status: 500 })
  }
}
