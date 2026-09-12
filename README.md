# Ramindu Linal Portfolio

Production-ready Vite + React + TypeScript portfolio preserving the supplied editorial design, with seeded fallback content, Supabase persistence, an authenticated admin area, asset uploads, and a Leaflet travel map.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without Supabase variables the site uses seed content in `src/data.ts`, so previews and local development work without a backend.

## Supabase

Create a project, run `supabase/migrations/001_initial.sql` in the SQL editor, and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`. Create an Auth user, then set `is_admin: true` in that user's `raw_app_meta_data` using the dashboard or service role. RLS allows public reads and limits writes/deletes and storage uploads to designated admins.

The `/admin` route requires Supabase email/password authentication. The client data layer (`src/lib/data.ts`) provides loading and CRUD helpers, while `src/lib/supabase.ts` includes a safe public storage upload helper.

## Build and deploy

```bash
npm run typecheck
npm run build
```

Deploy to Vercel, configure the two `VITE_` environment variables, and use the included `vercel.json` SPA rewrite. Leaflet tiles are provided by CARTO/OpenStreetMap and include attribution.

## Accessibility and SEO

Semantic sections, labelled navigation/map, keyboard-friendly controls, meaningful image alt text, a description meta tag, document language, and responsive layouts are included. Replace the portrait placeholder through the profile record for production.
