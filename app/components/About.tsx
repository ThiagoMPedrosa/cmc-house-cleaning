export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-600">About CMC House Cleaning</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src="/workers.png?height=400&width=600" 
              alt="Cleaning team" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-lg text-gray-700 mb-4">
              CMC House Cleaning has been providing top-notch cleaning services for over 10 years. Our team of experienced and dedicated professionals ensures that your home or office is spotless and hygienic.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              We use eco-friendly cleaning products and state-of-the-art equipment to deliver exceptional results while being mindful of the environment and your health.
            </p>
            <p className="text-lg text-gray-700">
              Choose CMC House Cleaning for a cleaner, healthier, and more comfortable living or working space.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

