# CMC House Cleaning

Website for CMC House Cleaning, a residential cleaning business in Denver, Colorado. It presents the business's services and testimonials, and lets visitors request a free estimate.

**Live site:** [cmchousecleaning.com](https://cmchousecleaning.com/)

## Features

- **Landing page** with services, an about section, testimonials and contact details
- **Contact form** that emails each request to the business through [Resend](https://resend.com), protected from bots with [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)
- **Testimonials** stored in a serverless Postgres database ([Neon](https://neon.tech)), with a form for clients to submit new ones
- **Responsive UI** built with Tailwind CSS and shadcn/ui (Radix) components, with form validation using React Hook Form and Zod

## Tech stack

Next.js (App Router) · TypeScript · React · Tailwind CSS · Neon Postgres · Resend · Cloudflare Turnstile · Vercel

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Create a `.env.local` file with these variables. Secrets are never committed to the repository.

```
DATABASE_URL=
RESEND_API_KEY=
RESEND_EMAIL_RECIPIENT=
RESEND_EMAIL_SENDER=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```
