# Vows & Vistas — Wedding Planner Portfolio Website

A complete Next.js 14 portfolio + lead generation website for luxury wedding planners and event organizers.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel (Free)

1. Create account at vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in this folder
4. Done! Your site is live.

## Customise the Content

| File | What to edit |
|---|---|
| `src/components/Hero.tsx` | Studio name, tagline, stats |
| `src/components/About.tsx` | Studio story, values |
| `src/components/Services.tsx` | Services + prices |
| `src/components/Portfolio.tsx` | Gallery photos (swap Unsplash URLs with Cloudinary URLs) |
| `src/components/Team.tsx` | Team members + bios |
| `src/components/Testimonials.tsx` | Client reviews |
| `src/components/FAQ.tsx` | Questions and answers |
| `src/components/Footer.tsx` | Phone, email, address |
| `src/components/BookingCTA.tsx` | WhatsApp number |

## Connect Forms to Real Backend

The forms currently show a success state after 1 second (demo mode).
To receive real enquiries, replace the `submit` function in `ContactForms.tsx`:

### Option A: Formspree (Easiest — Free)
```js
const submit = async (e) => {
  e.preventDefault()
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
  setSent(true)
}
```

### Option B: Web3Forms (Free)
```js
const submit = async (e) => {
  e.preventDefault()
  await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_key: 'YOUR_KEY', ...form })
  })
  setSent(true)
}
```

## WhatsApp Number

Replace `919876543210` in these files with your actual number (country code + number, no +):
- `src/components/BookingCTA.tsx`
- `src/components/FAQ.tsx`  
- `src/components/Footer.tsx`

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: Playfair Display + Cormorant Garamond + DM Sans (Google Fonts)
- **Images**: Unsplash (replace with Cloudinary for client photos)
- **Forms**: Ready for Formspree / Web3Forms integration
- **Hosting**: Deploy free on Vercel

## Sections Included

1. ✅ Navbar (transparent → solid on scroll, mobile hamburger)
2. ✅ Hero (cinematic, stats, dual CTA)
3. ✅ About (story, values, floating card)
4. ✅ Services (6 service cards with pricing)
5. ✅ Portfolio (filterable gallery with lightbox)
6. ✅ Team (4 member cards)
7. ✅ Testimonials (interactive selector)
8. ✅ FAQ (accordion)
9. ✅ Booking CTA (parallax, WhatsApp button)
10. ✅ Contact Forms (3 forms: Quick Enquiry, Full Booking, Callback)
11. ✅ Footer (full info + floating WhatsApp button)
