import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Testimonials } from './components/Testimonials'
import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  )
}

