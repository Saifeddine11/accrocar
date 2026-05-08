# Accrocar — Luxury Car Concierge in Marrakech

Editorial, minimal, cinematic. A handcrafted luxury website built to feel like an international house — not a startup, not a template.

## Stack

- React 18 + Vite
- Tailwind CSS (custom design tokens)
- Framer Motion (smooth, slow, expo-out)
- Lenis (silky inertia scroll)
- React Router 6 (lazy-loaded routes, animated transitions)
- i18next — FR / EN / ES / RO
- react-helmet-async (per-page SEO + JSON-LD)

## Design system

Color:

- `#F2F1ED` Soft Pearl — main background
- `#161616` Obsidian Black — primary text and refined contrast
- `#710014` Crimson Depth — premium accents, buttons, hover, active states
- `#B38F6F` Warm Sand — subtle highlights, borders, and secondary UI

Typography:

- Display: **Playfair Display** (italic for editorial accents) and **Cormorant Garamond**
- Body: **Inter**
- Eyebrow: 11px, 0.32em letter-spacing, uppercase

Tokens live in `tailwind.config.js` and `src/index.css`.

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build && npm run preview
```

## Project layout

```
src/
  components/        Navbar, Footer, SmoothScroll, Seo, animations/
  sections/          Hero, Intro, BrandsMarquee, FeaturedFleet, Experience,
                     Services, Why, Testimonials, FinalCta
  pages/             Home, Fleet, CarDetail, VIPServices, PrivateChauffeur,
                     Weddings, About, Contact
  data/cars.js       Fleet roster (replace placeholder imagery)
  i18n/locales/      en, fr, es, ro
  lib/whatsapp.js    Single-source WhatsApp deep-link
```

## SEO

- Per-page `<Seo>` (title, description, canonical, OG, Twitter, JSON-LD)
- Site-wide `LocalBusiness` schema in `index.html`
- `Product` schema on every car detail page
- `sitemap.xml` and `robots.txt` in `public/`

## Animation principles

- Smooth, slow, expo-out — never aggressive
- Image scale + parallax tied to scroll progress
- Line-by-line text reveal, staggered card groups
- Page transitions via `AnimatePresence`
- Lenis disabled on touch for native feel

## Replacing placeholders

- Imagery: `src/data/cars.js`, `src/sections/Hero.jsx`, etc.
- Phone / WhatsApp: `src/lib/whatsapp.js`
- Address & social: `src/components/Footer.jsx` and `src/pages/Contact.jsx`
- OG image: `public/og-image.jpg` (1200×630)
# accrocar
