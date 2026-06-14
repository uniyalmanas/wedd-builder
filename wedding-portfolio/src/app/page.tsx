import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Team from '@/components/Team'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import BookingCTA from '@/components/BookingCTA'
import ContactForms from '@/components/ContactForms'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Team />
      <Testimonials />
      <FAQ />
      <BookingCTA />
      <ContactForms />
      <Footer />
    </main>
  )
}
