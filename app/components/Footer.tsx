import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react"
import contactData from "@/data/contact.json"

export function Footer() {
  return (
    <footer className="bg-green-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CMC House Cleaning</h3>
            <p className="mb-4">
              Professional cleaning services for residential and commercial properties throughout Maryland. Reliable,
              thorough, and affordable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <a href={`tel:${contactData.phone.replace(/[^\d+]/g, "")}`}>{contactData.phone}</a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Serving Denver</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>Residential Cleaning</li>
              <li>Commercial Cleaning</li>
              <li>Deep Cleaning</li>
              <li>Move-in/Move-out</li>
              <li>Post-Construction</li>
              <li>Regular Maintenance</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-500 mt-8 pt-8 text-center">
          <p>&copy; 2025 CMC House Cleaning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
