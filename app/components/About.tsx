import { Award, Users, Clock, Leaf } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Professional Excellence",
    description: "Years of experience providing top-quality cleaning services",
  },
  {
    icon: Users,
    title: "Trained Staff",
    description: "Our team is professionally trained and background checked",
  },
  {
    icon: Clock,
    title: "Reliable Service",
    description: "Consistent, on-time service you can depend on",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "We use environmentally safe cleaning products",
  },
]

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-600">About CMC House Cleaning</h2>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img
              src="/workers.png?height=400&width=600&text=CMC+Cleaning+Team+at+Work"
              alt="CMC House Cleaning team providing professional service"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2">
            <p className="text-lg text-gray-700 mb-6">
              CMC House Cleaning has been serving Maryland families and businesses with reliable, professional cleaning
              services. We understand that your time is valuable, and a clean environment is essential for your comfort
              and productivity.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Our experienced team uses high-quality, eco-friendly cleaning products and proven techniques to ensure
              your space is not just clean, but truly spotless. We're fully insured and bonded for your protection and
              peace of mind.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start">
                    <IconComponent className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
