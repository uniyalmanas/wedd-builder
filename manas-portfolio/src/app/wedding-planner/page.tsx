import Navbar from '@/components/wedding-planner/Navbar'
import Hero from '@/components/wedding-planner/Hero'
import About from '@/components/wedding-planner/About'
import Services from '@/components/wedding-planner/Services'
import Portfolio from '@/components/wedding-planner/Portfolio'
import Team from '@/components/wedding-planner/Team'
import Testimonials from '@/components/wedding-planner/Testimonials'
import FAQ from '@/components/wedding-planner/FAQ'
import BookingCTA from '@/components/wedding-planner/BookingCTA'
import ContactForms from '@/components/wedding-planner/ContactForms'
import Footer from '@/components/wedding-planner/Footer'

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
