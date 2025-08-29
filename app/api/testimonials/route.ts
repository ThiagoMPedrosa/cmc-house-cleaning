import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const testimonialsPath = path.join(process.cwd(), "data", "testimonials.json")

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "6")
    const offset = (page - 1) * limit

    const fileContents = fs.readFileSync(testimonialsPath, "utf8")
    const allTestimonials = JSON.parse(fileContents)

    // Sort by date (newest first)
    allTestimonials.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const totalTestimonials = allTestimonials.length
    const totalPages = Math.ceil(totalTestimonials / limit)
    const testimonials = allTestimonials.slice(offset, offset + limit)

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

    // Read existing testimonials
    let testimonials = []
    try {
      const fileContents = fs.readFileSync(testimonialsPath, "utf8")
      testimonials = JSON.parse(fileContents)
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      testimonials = []
    }

    // Create new testimonial
    const newTestimonial = {
      id: testimonials.length > 0 ? Math.max(...testimonials.map((t) => t.id)) + 1 : 1,
      name,
      text,
      date: new Date().toISOString().split("T")[0],
    }

    // Add to testimonials array
    testimonials.push(newTestimonial)

    // Ensure data directory exists
    const dataDir = path.dirname(testimonialsPath)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Write back to file
    fs.writeFileSync(testimonialsPath, JSON.stringify(testimonials, null, 2))

    return NextResponse.json(newTestimonial, { status: 201 })
  } catch (error) {
    console.error("Error saving testimonial:", error)
    return NextResponse.json({ error: "Failed to save testimonial" }, { status: 500 })
  }
}
