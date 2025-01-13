import { Check } from 'lucide-react'

const services = [
  "Regular House Cleaning",
  "Deep Cleaning",
  "Move-In / Move-Out Cleaning",
  "Post-Construction Cleaning",
  "Office Cleaning",
  "Carpet Cleaning"
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-600">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex items-center bg-white p-6 rounded-lg shadow-md">
              <Check className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
              <span className="text-lg text-gray-700">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

