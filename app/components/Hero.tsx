import Image from "next/image"
import Link from "next/link"
import { Phone, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import contactData from "@/data/contact.json"

export function Hero() {
  const phoneNumber = contactData.phone.replace(/[^\d+]/g, "")

  return (
    <section className="bg-green-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 pt-5 pb-10 sm:pt-10 sm:pb-14 lg:py-18">

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 lg:gap-14">

          {/* Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">

            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-green-100 mb-3">
              Trusted Cleaning Services in Denver
            </p>

            <h1 className="text-[2.35rem] leading-[1.08] sm:text-5xl lg:text-6xl font-bold mb-5 max-w-2xl mx-auto md:mx-0">
              Professional House Cleaning Services in Denver
            </h1>

            <p className="hidden md:block text-lg sm:text-xl leading-relaxed text-green-50 mb-7 max-w-xl mx-auto md:mx-0">
              Reliable, thorough, and affordable cleaning for your home and office.
            </p>

            {/* CTA buttons */}
            <div className="hidden sm:flex sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto md:mx-0">

              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto sm:min-w-[210px] bg-white text-green-700 hover:bg-gray-100 font-semibold h-12"
              >
                <Link href="#contact">
                  Get a Free Estimate
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto sm:min-w-[210px] border-white text-white hover:bg-white hover:text-green-700 bg-transparent h-12"
              >
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call {contactData.phone}
                </a>
              </Button>

            </div>

            {/* Trust indicators */}
            <div className="mt-5 md:mt-6 flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-sm sm:text-base text-green-50">

              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Free Estimates
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Reliable Service
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Residential & Commercial
              </span>

            </div>

          </div>

          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">

              <Image
                src="/cmclogo.jpg"
                alt="CMC House Cleaning"
                width={700}
                height={500}
                priority
                className="w-full h-auto object-cover"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}