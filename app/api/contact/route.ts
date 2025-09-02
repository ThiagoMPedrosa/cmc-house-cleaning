import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Use environment variables for sender and recipient email addresses
const EMAIL_SENDER = process.env.EMAIL_SENDER || "no-reply@email.com"
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || "your@email.com"

export async function POST(request: Request) {
  try {
    const { name, email, phone, service, message } = await request.json()
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    await resend.emails.send({
      from: EMAIL_SENDER, // Set in .env.local or deployment environment
      to: EMAIL_RECIPIENT, // Set in .env.local or deployment environment
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}\nReply_to: ${email}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Resend error:", error)
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
  }
}
