# WeddingCanvas 💍
### Your Cinematic Indian Wedding Portal Builder

---

## What Is This?

WeddingCanvas is a complete, standalone web product that lets couples build a **cinematic wedding portal** — a beautiful, personalised website that tells their entire wedding story, from how they met to Vidaai.

No coding. No subscriptions. Just open `index.html` and build.

---

## Files Included

```
weddingcanvas/
├── index.html          ← The main builder app (open this)
├── css/
│   └── builder.css     ← All styles for the builder & landing page
├── js/
│   ├── themes.js       ← All 6 theme definitions & ceremony defaults
│   ├── builder.js      ← Builder app logic (steps, forms, navigation)
│   └── generator.js    ← Portal HTML generator engine
├── pages/
│   └── demo-portal.html ← A pre-built demo portal (Arya & Dev)
└── README.md           ← You are here
```

---

## How To Use

### For Clients (Couples):
1. Open `index.html` in any modern browser
2. Click **"Create Your Portal"**
3. Follow 5 steps:
   - **Step 1 — Theme:** Choose from 6 cinematic Indian themes
   - **Step 2 — Story:** Add names, dates, love story, timeline milestones
   - **Step 3 — Ceremonies:** Toggle and customise each ceremony
   - **Step 4 — Media:** Add film link, upload photos, pre-add blessings
   - **Step 5 — Preview:** See the live portal and download it
4. Click **"Download Portal HTML"** — get a single self-contained `.html` file
5. Share it, host it, or send it as a link

### For You (As a Business):
- Show clients the landing page and demo portal
- Help them fill in their details in the builder
- Download their portal → upload to any web host (Netlify, GitHub Pages, etc.)
- Charge per portal or offer as a service

---

## The 6 Themes

| Theme | Colors | Inspired By |
|-------|--------|-------------|
| **Royal Rajasthani** | Burgundy & Gold | Rajputana palaces, mandala art |
| **Mughal Garden** | Emerald & Ivory | Mughal architecture, garden geometry |
| **Marigold Bloom** | Saffron & Midnight | Marigold garlands, festive India |
| **Modern Minimal** | Cream & Charcoal | Contemporary Indian weddings |
| **Kerala Heritage** | Ocean & Gold | Temple lamps, Kerala tradition |
| **Bengali Blossom** | Rose & Deep Plum | Durga Puja, Bengali wedding art |

---

## Portal Sections

Each generated portal includes:

1. **Hero** — Full-screen with couple's names, animated mandala, floating petals
2. **Our Story** — Timeline of relationship milestones
3. **Ceremonies** — Cards for each enabled ceremony (Haldi, Mehendi, Sangeet, Vivah, Vidaai, Reception)
4. **Love Note** — Optional message from the couple to their guests
5. **Gallery** — 8-cell cinematic mosaic with uploaded photos
6. **Short Film** — YouTube/Vimeo embed in a film-reel frame
7. **Blessings** — Pre-added blessings + live guest blessing form
8. **Footer** — Couple's names, date, city

---

## Hosting Your Portal

The downloaded portal is a **single HTML file** — completely self-contained.

**Free hosting options:**
- **Netlify Drop:** Go to netlify.com/drop → drag & drop the HTML file → get a URL instantly
- **GitHub Pages:** Push to a repo, enable Pages, done
- **Vercel:** `vercel deploy` with the file
- **WhatsApp/Email:** Just send the `.html` file directly — opens in any browser

**Custom domain:** Point `arya-dev.com` to your hosted file for a premium feel.

---

## Expanding This Product

**Coming soon / build next:**
- Western theme (for Western/fusion weddings)
- Password-protected guest mode
- QR code generator for invitations
- Multi-page portal (separate page per ceremony)
- Backend with database (store portals online permanently)
- Admin dashboard to manage client portals

---

## Technical Notes

- **Pure HTML/CSS/JS** — no frameworks, no build step, no dependencies
- **Google Fonts** — Cormorant Garamond + Lato (loads from CDN)
- **Photo storage** — Photos are embedded as base64 in the output HTML
- **Video** — YouTube and Vimeo embeds supported
- **Browser support** — All modern browsers (Chrome, Safari, Firefox, Edge)

---

## License

Built for WeddingCanvas. All rights reserved.

---

*Crafted with love for every Indian wedding* 💛
