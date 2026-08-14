"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import contactData from "@/data/contact.json"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const phoneNumber = contactData.phone.replace(/[^\d+]/g, "")

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between gap-3">

          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-lg sm:text-xl md:text-2xl font-bold text-green-600 hover:text-green-700 transition-colors leading-tight"
            aria-label="CMC House Cleaning - Home"
            onClick={closeMobileMenu}
          >
            <span className="sm:hidden">
              CMC Cleaning
            </span>

            <span className="hidden sm:inline">
              CMC House Cleaning
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Main navigation"
          >
            <Link
              href="#services"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Services
            </Link>

            <Link
              href="#about"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              About
            </Link>

            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Testimonials
            </Link>

            <Link
              href="#contact"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Phone */}
            <a
              href={`tel:${phoneNumber}`}
              className="
                flex items-center justify-center
                h-10
                rounded-md
                text-green-600
                hover:text-green-700
                hover:bg-green-50
                transition-colors
                px-2
                sm:px-3
              "
              aria-label={`Call ${contactData.phone}`}
            >
              <Phone className="w-5 h-5 flex-shrink-0" />

              <span className="hidden xl:inline ml-2 text-sm font-medium text-gray-700">
                {contactData.phone}
              </span>
            </a>

            {/* Quote CTA */}
            <Button
              asChild
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                shadow-sm
                whitespace-nowrap
                h-10
                px-3
                sm:px-4
                text-sm
              "
            >
              <Link
                href="#contact"
                onClick={closeMobileMenu}
              >
                <span className="sm:hidden">
                  Quote
                </span>

                <span className="hidden sm:inline">
                  Get a Quote
                </span>
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10"
              onClick={() =>
                setMobileMenuOpen((previous) => !previous)
              }
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`
          lg:hidden
          overflow-hidden
          border-t
          border-gray-100
          bg-white
          transition-all
          duration-300
          ease-in-out
          ${
            mobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 border-t-0"
          }
        `}
      >
        <nav
          className="container mx-auto px-4 py-3"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col">

            <Link
              href="#services"
              onClick={closeMobileMenu}
              className="
                flex items-center
                min-h-12
                px-3
                rounded-md
                text-gray-700
                font-medium
                hover:text-green-600
                hover:bg-green-50
                transition-colors
              "
            >
              Services
            </Link>

            <Link
              href="#about"
              onClick={closeMobileMenu}
              className="
                flex items-center
                min-h-12
                px-3
                rounded-md
                text-gray-700
                font-medium
                hover:text-green-600
                hover:bg-green-50
                transition-colors
              "
            >
              About
            </Link>

            <Link
              href="#testimonials"
              onClick={closeMobileMenu}
              className="
                flex items-center
                min-h-12
                px-3
                rounded-md
                text-gray-700
                font-medium
                hover:text-green-600
                hover:bg-green-50
                transition-colors
              "
            >
              Testimonials
            </Link>

            <Link
              href="#contact"
              onClick={closeMobileMenu}
              className="
                flex items-center
                min-h-12
                px-3
                rounded-md
                text-gray-700
                font-medium
                hover:text-green-600
                hover:bg-green-50
                transition-colors
              "
            >
              Contact
            </Link>

            {/* Mobile phone CTA */}
            <div className="mt-2 pt-3 border-t border-gray-100">
              <a
                href={`tel:${phoneNumber}`}
                onClick={closeMobileMenu}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  w-full
                  h-11
                  rounded-md
                  border
                  border-green-600
                  text-green-600
                  font-medium
                  hover:bg-green-50
                  transition-colors
                "
              >
                <Phone className="w-4 h-4" />
                Call {contactData.phone}
              </a>
            </div>

          </div>
        </nav>
      </div>
    </header>
  )
}