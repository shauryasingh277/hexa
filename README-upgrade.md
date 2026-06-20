# Hexa — Professional E‑commerce Upgrade

This branch (feature/full-upgrade) contains a Next.js-based upgrade of the Hexa front-end with Tailwind, product pages, serverless Stripe checkout endpoint, and a Netlify CMS admin UI.

What I added
- Next.js app with pages:
  - index, product/[id], cart, account
  - API route: /api/checkout (Stripe Checkout session creator)
- Tailwind CSS build (PostCSS + Tailwind) and global styles
- products stored in content/products.json (source of truth)
- Netlify CMS admin at /admin (Git Gateway backend assumed)
- README notes for deployment (Vercel recommended) and env variables

How to run locally
1. Install dependencies
   - npm install
2. Start dev server
   - npm run dev
   - Open http://localhost:3000

Environment
- Create a .env.local file in the project root with the following values for Stripe integration and BASE_URL:

STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
BASE_URL=http://localhost:3000

Notes about deployment
- Recommended provider: Vercel (automatic Next.js support + serverless functions).
  - Import the repo on Vercel, set environment variables (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, BASE_URL) in the project settings, and deploy.
- Netlify: works for static export; for Stripe serverless functions use Netlify Functions and adjust the API route.

Netlify CMS
- The admin UI is at /admin (public/admin/index.html). It uses git-gateway backend by default — configure Netlify Identity + Git Gateway if deploying on Netlify.
- The CMS is configured to edit content/products.json. For better structured editing consider moving products to individual YAML/JSON files under content/products/ and updating config.yml accordingly.

Security
- Never commit Stripe secret keys. Use environment variables on your host.
- The demo account/login still uses client-side storage — replace with real auth before going to production.

Next steps I can take for you
- Configure CI/CD with Vercel and add a one-click deploy badge.
- Move Netlify CMS to file-based collections for per-product editing.
- Add image optimization (local images + next/image) and lazy loading.
- Add sitemap.xml generation and canonical tags for SEO.

If you want, I will now:
1) Finish polishing styles and images
2) Add GitHub Action or Vercel configuration for automatic deploy
3) Create a PR from feature/full-upgrade into main

Tell me if you want me to proceed to create a PR and prepare the repository for a Vercel deployment (I will not publish any secrets). 
