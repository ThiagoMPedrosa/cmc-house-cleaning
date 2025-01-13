import { Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">CMC House Cleaning</h3>
            <p>Professional cleaning services for your home and office.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>123 Main St, Anytown, USA 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@cmchousecleaning.com</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><Facebook /></a>
              <a href="#" className="hover:text-gray-300"><Twitter /></a>
              <a href="#" className="hover:text-gray-300"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-green-500 mt-8 pt-8 text-center">
          <p>&copy; 2023 CMC House Cleaning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

