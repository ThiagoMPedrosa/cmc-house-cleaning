import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="bg-green-600 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional House Cleaning Services</h1>
          <p className="text-xl mb-8">We make your home sparkle, so you don't have to!</p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            Get a Free Quote
          </Button>
        </div>
        <div className="md:w-1/2">
          <img 
            src="/cmclogo.jpg?height=400&width=600" 
            alt="Clean home" 
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

