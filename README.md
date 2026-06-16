# Wedd-Builder Ateliers & Flagship Portfolio

A consolidated premium workspace for **Manas Uniyal's** bespoke digital flagships, interactive website builders, and luxury wedding planners.

---

## 🚀 Live Testing Links

Experience the production deployments hosted live:

* 🌐 **Bespoke Portfolio (Manas Uniyal):** [https://manas-portfolio-seven.vercel.app](https://manas-portfolio-seven.vercel.app)
* 🌸 **Atelier 01 (Vows & Vistas Client Sandbox):** [https://manas-portfolio-seven.vercel.app/wedding-planner](https://manas-portfolio-seven.vercel.app/wedding-planner)
* 🎨 **Atelier 02 (WeddingCanvas HTML Builder):** [https://manas-portfolio-seven.vercel.app/weddingcanvas/index.html](https://manas-portfolio-seven.vercel.app/weddingcanvas/index.html)
* 🏋️ **Atelier 03 (Apex Gym Hub & SaaS CRM):** [https://manas-portfolio-seven.vercel.app/gym-app/](https://manas-portfolio-seven.vercel.app/gym-app/)

---

## 📂 Project Directory Structure

This repository acts as a monorepo workspace holding the following structures:

```bash
wedd-builder/
├── gym-app/               # Dedicated Vite/React client for Apex Gym Hub
├── manas-portfolio/       # Main Next.js portfolio website (bilingual, luxury theme)
│   ├── src/app/           # Next.js app pages and Gym Hub API endpoints
│   └── public/            # Static files, assets, and compiled builders
│       ├── weddingcanvas/ # Embedded compiler for unified routing
│       └── gym-app/       # Compiled gym-app client folder served by Next.js
├── wedding-portfolio/     # Dedicated Next.js frontend for "Vows & Vistas"
└── weddingcanvas/         # Standalone HTML/JS compiler wizard for wedding schedules
```

---

## 🛠️ Technical Specifications

### 0. Apex Gym Hub (`gym-app` & backend APIs)
* **Client Tech:** Vite, React 19, TypeScript, Vanilla CSS design tokens.
* **Security:** Native JWT Authentication with `Bearer` header token injection via `authFetch`.
* **Payments:** Fully integrated Stripe Checkout sessions for class & trainer bookings.
* **CRM Console:** Operator dashboard displaying real-time metrics, automated email dispatcher (welcome, receipt invoice, inquiry thank-you), and graphical member manager (inline role/tier updates, user registration, database deletion with cascade cleanup).
* **Database fallback:** PostgreSQL (Supabase) in production, local file backup locally.

### 1. Digital Flagship Portfolio (`manas-portfolio`)
* **Framework:** Next.js 16.2.9 (Turbopack) & React 19
* **Styling:** Tailwind CSS v4 & custom Obsidian/Alabaster themes
* **Bilingual Support:** Smooth English/Hindi switching:
  * Brand names, tech acronyms, and metrics retain print-like formatting in English script.
  * Typography is responsive and optimized using Noto Serif Devanagari.
* **Inline Editor & Gemini AI:** Built-in generative helper badge calling Google Gemini API to polish, rewrite, and scale site copy live.
* **Leads Logger:** In-situ contact caches keeping form data locally secure.

### 2. Standalone HTML Compiler (`weddingcanvas`)
* **Aesthetic:** Modern, card-based flat design
* **Capabilities:** Light-weight JS wizard structuring schedules, locations, and guest logs to download as a single, independent `.html` website instantly.

---

## 💻 Local Development Setup

To run any of the full-stack Next.js applications locally:

1. **Install dependencies:**
   ```bash
   cd manas-portfolio
   npm install
   ```

2. **Setup environment variables:**
   Create `.env.local` inside `manas-portfolio/` and append your Google Gemini API key:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

3. **Start the Turbopack dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the live interface.

---

## 📦 Deployments

This workspace is fully configured for automated CI/CD deployments:
* **GitHub Repository:** [https://github.com/uniyalmanas/wedd-builder.git](https://github.com/uniyalmanas/wedd-builder.git)
* **Hosting:** Next.js pages and API routes run natively on **Vercel** serverless functions. Push modifications to the `main` branch to automatically trigger live deploys.
