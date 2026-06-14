import './wedding-planner.css'
import { PortfolioDataProvider } from '@/context/wedding-planner/PortfolioDataContext'
import AdminPanel from '@/components/wedding-planner/AdminPanel'
import StripeCheckoutModal from '@/components/wedding-planner/StripeCheckoutModal'

export const metadata = {
  title: 'Vows & Vistas | Luxury Wedding Planner & Event Designer',
  description: 'Bespoke wedding planning, design, and coordination across India. Turning dream celebrations into flawless reality.',
}

export default function WeddingPlannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream-50 text-charcoal-900 antialiased scroll-smooth">
      <PortfolioDataProvider>
        {children}
        <AdminPanel />
        <StripeCheckoutModal />
      </PortfolioDataProvider>
    </div>
  )
}
