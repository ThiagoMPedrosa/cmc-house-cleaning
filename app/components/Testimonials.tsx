import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "John Doe",
    text: "CMC House Cleaning has been a game-changer for our family. Their attention to detail is impressive!"
  },
  {
    name: "Jane Smith",
    text: "I've been using CMC for my office cleaning needs, and they never disappoint. Highly recommended!"
  },
  {
    name: "Mike Johnson",
    text: "The team at CMC is professional, thorough, and always goes the extra mile. I couldn't be happier with their service."
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-600">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <p className="font-semibold text-green-600">{testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

