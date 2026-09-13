# Shunya (शून्य)

Personal portfolio and research site for Machiraju Karthikeya — computational quantum physics, quantum simulation of lattice gauge theories, and non-equilibrium many-body dynamics.

Live at [0shunya0.github.io](https://0shunya0.github.io).

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- React 19
- Tailwind CSS v4
- TypeScript

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Produces a static export in `./out` (`next.config.mjs` sets `output: 'export'`).

## Deployment

Deploys to GitHub Pages automatically on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow can also be triggered manually from the Actions tab (`workflow_dispatch`).

## Structure

- `app/` — pages (home, `/teaching`)
- `components/` — page sections (hero, projects/research, about, experience, skills, contact) and the trimmed set of shadcn/ui primitives actually in use (`button`, `input`, `textarea`)
- `public/` — static assets: CV, teaching-note PDFs
- `lib/` — shared utilities
