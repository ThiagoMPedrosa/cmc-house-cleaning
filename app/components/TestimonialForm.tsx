"use client"

import type React from "react"

import { useState } from "react"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TestimonialFormProps {
  onTestimonialAdded: () => void
}

export function TestimonialForm({ onTestimonialAdded }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    text: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    // Get the Turnstile token automatically created by Cloudflare
    const form = e.currentTarget

    const captchaToken = (
      form.elements.namedItem(
        "cf-turnstile-response"
      ) as HTMLInputElement
    )?.value

    // Do not submit if CAPTCHA was not completed
    if (!captchaToken) {
      setMessage("Please complete the verification.")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      })

      if (response.ok) {
        setMessage("Thank you for your testimonial!")

        setFormData({
          name: "",
          text: "",
        })

        onTestimonialAdded()
      } else {
        const data = await response.json().catch(() => null)

        setMessage(
          data?.error ||
            "Failed to submit testimonial. Please try again."
        )
      }
    } catch (error) {
      console.error(error)

      setMessage(
        "An error occurred. Please try again."
      )
    } finally {
      setIsSubmitting(false)

      // Reset Turnstile so a new token can be generated
      ;(window as any).turnstile?.reset()
    }
  }

  return (
    <>
      {/* Cloudflare Turnstile */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-green-600">
            Share Your Experience
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Textarea
              name="text"
              placeholder="Tell us about your experience with CMC House Cleaning..."
              value={formData.text}
              onChange={handleChange}
              rows={4}
              required
            />

            {/* Cloudflare Turnstile widget */}
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-theme="light"
              data-size="flexible"
            />

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Testimonial"}
            </Button>

            {message && (
              <p
                className={`text-center ${
                  message.includes("Thank you")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
            
          </form>
        </CardContent>
      </Card>
    </>
  )
}