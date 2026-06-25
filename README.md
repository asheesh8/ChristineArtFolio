# Christine Porter Fine Art

Modern artist website and print-ordering preview for Christine Porter Fine Art / Christine Porter Photography.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Pull public Zenfolio assets

```bash
python3 scripts/scrape-christine-zenfolio-assets.py
```

The scraper downloads public image assets into `public/christine-assets` and writes `public/christine-assets/manifest.json` with source page, image URL, filename, alt text, guessed title, and file size.

Only use downloaded images with Christine Porter's permission. The local copy avoids hotlinking and is intended for this client redesign.

## Project structure

- `src/data/artworks.ts` seed artwork catalog
- `src/data/categories.ts` gallery categories
- `src/data/businessInfo.ts` client and studio details
- `src/data/printOptions.ts` print sizes, materials, framing options, and ordering steps
- `src/app/order-prints` mocked print inquiry flow
- `src/app/admin` placeholder for future artwork, inquiry, availability, pricing, and settings management

## Future Supabase plan

Add tables for artworks, categories, print inquiries, original inquiries, availability history, and site settings. The mocked form and admin placeholder are structured so they can be swapped for authenticated Supabase writes later.

## Deployment notes

This is a Next.js, TypeScript, Tailwind CSS app. It can be deployed to Vercel or Netlify after confirming final images, artwork names, pricing, original availability, and contact details with Christine.
