# APSAD Lebanon

Brand site for APSAD (Association pour la Protection des Sites et Anciennes
Demeures au Liban). Next.js 15 App Router, Tailwind 3 + shadcn/ui, Genkit AI chatbot.

## Run

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:9002
```

`npm run build` type-checks the project and fails on type errors.

## Configuration

All settings are environment variables, documented in `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — the public address, used for canonical URLs, `sitemap.xml`, `robots.txt` and sharing previews.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — contact-form delivery through [Resend](https://resend.com). Until these are set, the form tells visitors their message could not be sent.
- `GOOGLE_GENAI_API_KEY` — the AI chatbot.

## Design

Read `PRODUCT.md` and `DESIGN.md` before any UI work. Tokens live in `src/app/globals.css`.
