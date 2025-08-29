"use client"

import type React from "react"

import { useState, useEffect } from "react"
import contactData from "@/data/contact.json"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleServiceChange = (value: string) => {
    setFormData((prevState) => ({ ...prevState, service: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    // Simulate form submission
    setTimeout(() => {
      setMessage("Thank you for your inquiry! We'll contact you within 24 hours.")
      setFormData({ name: "", email: "", phone: "", service: "", message: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Card className="max-w-md mx-auto lg:mx-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Request a Quote</CardTitle>
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
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <Select onValueChange={handleServiceChange} value={formData.service}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Cleaning</SelectItem>
                    <SelectItem value="commercial">Commercial Cleaning</SelectItem>
                    <SelectItem value="deep">Deep Cleaning</SelectItem>
                    <SelectItem value="move">Move-in/Move-out</SelectItem>
                    <SelectItem value="construction">Post-Construction</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  name="message"
                  placeholder="Tell us about your cleaning needs..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : contactData.cta}
                </Button>
                {message && <p className="text-center text-green-600 font-medium">{message}</p>}
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-green-600">{contactData.cta}</h2>
              <p className="text-gray-600 mb-10 max-w-2xl">
                Contact us today for a free, no-obligation estimate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <p className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">Phone:</span> {contactData.phone}
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">Email:</span> {contactData.email}
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">Address:</span> {contactData.address}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">Business Hours</h3>
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
