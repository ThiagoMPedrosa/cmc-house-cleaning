import { Home, Building, Sparkles, Truck, Calendar, Shield } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Regular house cleaning, deep cleaning, and maintenance services for your home.",
  },
  {
    icon: Building,
    title: "Commercial Cleaning",
    description: "Professional office and commercial space cleaning services.",
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Comprehensive deep cleaning for move-ins, move-outs, and seasonal cleaning.",
  },
  {
    icon: Truck,
    title: "Post-Construction Cleanup",
    description: "Specialized cleaning services after construction or renovation projects.",
  },
  {
    icon: Calendar,
    title: "Regular Maintenance",
    description: "Weekly, bi-weekly, or monthly cleaning schedules to fit your needs.",
  },
  {
    icon: Shield,
    title: "Insured & Bonded",
    description: "Fully insured and bonded for your peace of mind and protection.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-600">Our Cleaning Services</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We provide comprehensive cleaning services for residential and commercial properties throughout Colorado, with
          a focus on quality, reliability, and customer satisfaction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <IconComponent className="w-8 h-8 text-green-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
