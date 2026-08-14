"use client"

import type React from "react"

import { useState } from "react"
import contactData from "@/data/contact.json"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
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

  const handleServiceChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      service: value,
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage(
          "Thank you for your inquiry! We'll contact you within 24 hours."
        )

        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        })
      } else {
        setMessage(
          data.error ||
            "Failed to send your inquiry. Please try again."
        )
      }
    } catch (error) {
      console.error(error)

      setMessage(
        "An error occurred. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">

          {/* Quote form */}
          <Card className="w-full max-w-lg mx-auto lg:mx-0">

            <CardHeader className="px-4 sm:px-6 pt-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-center">
                Request a Quote
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 pb-6">

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
                  className="w-full"
                  required
                />

                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                  required
                />

                <Input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                  required
                />

                <Select
                  onValueChange={handleServiceChange}
                  value={formData.service}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="residential">
                      Residential Cleaning
                    </SelectItem>

                    <SelectItem value="commercial">
                      Commercial Cleaning
                    </SelectItem>

                    <SelectItem value="deep">
                      Deep Cleaning
                    </SelectItem>

                    <SelectItem value="move">
                      Move-in/Move-out
                    </SelectItem>

                    <SelectItem value="construction">
                      Post-Construction
                    </SelectItem>

                    <SelectItem value="other">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Textarea
                  name="message"
                  placeholder="Tell us about your cleaning needs..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none"
                  required
                />

                {message && (
                  <p
                    className={`text-center text-sm sm:text-base font-medium ${
                      message.startsWith("Thank you")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Sending..."
                    : contactData.cta}
                </Button>

              </form>
            </CardContent>
          </Card>

          {/* Contact information */}
          <div className="space-y-8 w-full max-w-lg mx-auto lg:max-w-none lg:mx-0">

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-green-600">
                {contactData.cta}
              </h2>

              <p className="text-gray-600">
                Contact us today for a free,
                no-obligation estimate.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-4">
                Contact Information
              </h3>

              <div className="space-y-4 text-gray-700">

                <div>
                  <p className="font-medium">
                    Phone
                  </p>
                  <p className="break-words">
                    {contactData.phone}
                  </p>
                </div>

                <div>
                  <p className="font-medium">
                    Email
                  </p>
                  <p className="break-all">
                    {contactData.email}
                  </p>
                </div>

                <div>
                  <p className="font-medium">
                    Address
                  </p>
                  <p className="break-words">
                    {contactData.address}
                  </p>
                </div>

              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-4">
                Business Hours
              </h3>

              <div className="space-y-1 text-gray-700">
                <p>{contactData.weekdays}</p>
                <p>{contactData.saturday}</p>
                <p>{contactData.sunday}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}