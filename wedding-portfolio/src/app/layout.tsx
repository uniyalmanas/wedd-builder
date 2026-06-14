import type { Metadata } from 'next'
import './globals.css'
import { PortfolioDataProvider } from '@/context/PortfolioDataContext'
import AdminPanel from '@/components/AdminPanel'

export const metadata: Metadata = {
  title: 'Vows & Vistas | Luxury Wedding Planner & Event Designer',
  description: 'Bespoke wedding planning, design, and coordination across India. Turning dream celebrations into flawless reality.',
  keywords: 'wedding planner, event organizer, luxury weddings, destination wedding planner, India, wedding decor, event design',
  openGraph: {
    title: 'Vows & Vistas | Luxury Wedding Planner & Event Designer',
    description: 'Bespoke wedding planning, design, and coordination across India.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream-50 text-charcoal-900 antialiased">
        <PortfolioDataProvider>
          {children}
          <AdminPanel />
        </PortfolioDataProvider>
      </body>
    </html>
  )
}
