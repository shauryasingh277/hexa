# Hexa — Modern E‑commerce Template

This repository provides a simple, responsive e‑commerce front-end template built with Tailwind CSS. It's designed to be easy to edit and deploy (for example via GitHub Pages).

Features included:
- Clean, responsive layout (mobile + desktop)
- Navigation bar with categories and cart/account links
- Editable hero banner (see `assets/js/products.js` — BANNER object)
- Product grid with cards (image, name, price, add‑to‑cart)
- Shopping cart (quantity update) and checkout simulation (`cart.html`)
- Account page with signup/login (localStorage) and order history (`account.html`)
- Integrated search with suggestions
- SEO-friendly meta tags and JSON-LD
- Editable data in `assets/js/products.js` for products and banners

How to use
1. Edit content
   - Open `assets/js/products.js` — update `ITEMS` and `BANNER` to change products and hero content.
2. Preview locally
   - Serve the files using a static server. Example with Python 3:
     - `python -m http.server 8000`
     - Visit http://localhost:8000
3. Deploy
   - Push to GitHub and enable GitHub Pages (Settings → Pages) to serve the site.

Notes & next steps
- This is a front-end prototype. For production use, connect to a backend / headless CMS to manage products, users, and orders.
- Replace Tailwind CDN with a compiled Tailwind build for performance and remove unused CSS.
- Use proper authentication and payment integration (Stripe, PayPal) for real checkout.

If you want, I can:
- Add a product detail page template and link each card to it.
- Integrate Netlify/Stripe checkout or a headless CMS for editable content.
- Convert Tailwind CDN usage into a proper build (PostCSS + PurgeCSS) for smaller bundle size.
