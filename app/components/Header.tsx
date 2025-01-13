import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">CMC House Cleaning</Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="#services" className="text-gray-600 hover:text-green-600">Services</Link>
          <Link href="#about" className="text-gray-600 hover:text-green-600">About</Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-green-600">Testimonials</Link>
          <Link href="#contact" className="text-gray-600 hover:text-green-600">Contact</Link>
        </nav>
        <div className="flex items-center">
          <Phone className="w-5 h-5 mr-2 text-green-600" />
          <span className="text-gray-600 mr-4">(123) 456-7890</span>
          <Button variant="outline" className="hidden md:inline-flex">Get a Quote</Button>
        </div>
      </div>
    </header>
  )
}

