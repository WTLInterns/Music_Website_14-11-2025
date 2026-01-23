# Muziik Katta

A modern, music-themed Next.js (Pages Router, TypeScript) site styled with TailwindCSS.

## Scripts
- dev: start dev server at http://localhost:3000
- build: production build
- start: run production server

## Getting Started
1. Install deps
```bash
npm install
```
2. Run dev server
```bash
npm run dev
```

## Structure
- `src/pages/` – routes
- `src/components/` – shared UI
- `src/data/` – static content
- `src/styles/globals.css` – Tailwind styles

## Notes
- Replace placeholder logo in `Navbar` and images in `public/images`.
- Connect payment gateway (Stripe/Razorpay) in `src/pages/payment.tsx`.
- Update WhatsApp number in `src/pages/contact.tsx`.

## Tailwind
Configured in `tailwind.config.js`. Colors under `brand` for accents.
