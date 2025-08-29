"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TestimonialForm } from "./TestimonialForm"
import { Pagination } from "./Pagination"

interface Testimonial {
  id: number
  name: string
  text: string
  date: string
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalTestimonials: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 0,
    totalTestimonials: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchTestimonials = async (page = 1) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/testimonials?page=${page}&limit=6`)
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data.testimonials)
        setPagination(data.pagination)
        setCurrentPage(page)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials(1)
  }, [])

  const handleTestimonialAdded = () => {
    // After adding a testimonial, go to the first page to see the new testimonial
    fetchTestimonials(1)
  }

  const handlePageChange = (page: number) => {
    fetchTestimonials(page)
    // Scroll to testimonials section when page changes
    document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-green-600">What Our Customers Say</h2>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-2">Loading testimonials...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-600">What Our Customers Say</h2>

        {pagination.totalTestimonials > 0 && (
          <p className="text-center text-gray-600 mb-10">
            Showing {testimonials.length} of {pagination.totalTestimonials} testimonials
          </p>
        )}

        {testimonials.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <p className="text-gray-700 mb-4 flex-grow">"{testimonial.text}"</p>
                    <div className="flex justify-between items-center mt-auto">
                      <p className="font-semibold text-green-600">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
            />
          </>
        ) : (
          <p className="text-center mb-12">No testimonials yet. Be the first to share your experience!</p>
        )}

        <div className="mt-16">
          <TestimonialForm onTestimonialAdded={handleTestimonialAdded} />
        </div>
      </div>
    </section>
  )
}
