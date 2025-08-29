import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import contactData from "@/data/contact.json"

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          CMC House Cleaning
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="#services" className="text-gray-600 hover:text-green-600">
            Services
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-green-600">
            About
          </Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-green-600">
            Testimonials
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-green-600">
            Contact
          </Link>
        </nav>
        <div className="flex items-center">
          <Phone className="w-5 h-5 mr-2 text-green-600" />
          <a href={`tel:${contactData.phone.replace(/[^\d+]/g, "")}`} className="text-gray-600 mr-4">
            {contactData.phone}
          </a>
          <Link href="#contact" className="hidden md:inline-flex bg-transparent">
            <Button variant="outline" className="hidden md:inline-flex bg-transparent">
              Get a Quote
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
