"use client"

import type React from "react"

import { useState } from "react"
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage("Thank you for your testimonial!")
        setFormData({ name: "", text: "" })
        onTestimonialAdded()
      } else {
        setMessage("Failed to submit testimonial. Please try again.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-green-600">Share Your Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </Button>
          {message && (
            <p className={`text-center ${message.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
