import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getContactEmailHtml } from "@/utils/emailTemplate/getContactEmailHtml"

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_SENDER = process.env.RESEND_EMAIL_SENDER || "no-reply@email.com"
const EMAIL_RECIPIENT = process.env.RESEND_EMAIL_RECIPIENT || "your@email.com"

export async function POST(request: Request) {
  try {
    const { name, email, phone, service, message } = await request.json()
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    await resend.emails.send({
      from: EMAIL_SENDER,
      to: [EMAIL_RECIPIENT],
      subject: `New Contact Form Submission from ${name}`,
      html: getContactEmailHtml({ name, email, phone, service, message }),
      replyTo: `${email}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Resend error:", error)
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
  }
}