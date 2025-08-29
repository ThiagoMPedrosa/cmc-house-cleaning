import { Button } from "@/components/ui/button"
import Link from "next/link"
import contactData from "@/data/contact.json"

export function Hero() {
  return (
    <section className="bg-green-600 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional House Cleaning Services in Denver</h1>
          <p className="text-xl mb-6">
            Reliable, thorough, and affordable cleaning services for your home and office.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#contact" className="hidden md:inline-flex bg-transparent">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Get a Free Estimate
            </Button>
            </Link>
            <a href={`tel:${contactData.phone.replace(/[^\d+]/g, "")}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                {`Call ${contactData.phone}`}
              </Button>
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="/cmclogo.jpg?height=400&width=600&text=Professional+House+Cleaning+Team"
            alt="CMC House Cleaning professional team"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
