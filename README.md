# Rakshith Narayanaswamy — Data & AI Engineer Portfolio

Dark-mode, terminal-aesthetic portfolio built with **Vite + React + TypeScript + Tailwind CSS v4**.

## Editing content

**All content lives in [`src/data.ts`](src/data.ts).** Identity, bio, target roles,
tech stack, the four featured projects (challenge / architecture / metrics tabs),
dashboard simulation config, code snippets, and contact links — edit that one file
and the site updates. No component changes needed.

Things flagged for you to update:
- `contact.linkedin` — currently a guessed URL, replace with your real one.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
```

## Deploying to GitHub Pages

1. Create a GitHub repo named `portfolio` and push this project to `main`.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on
   every push to `main`. Site URL: `https://<username>.github.io/portfolio/`.

> If you rename the repo, update `base` in [`vite.config.ts`](vite.config.ts) to
> `'/<repo-name>/'`. For a user site (repo named `<username>.github.io`), set it to `'/'`.

## Structure

```
src/
  data.ts              ← ALL site content (edit this)
  components/
    ui.tsx             ← shared primitives (Section, Badge, TerminalPanel, StatusDot)
    Nav.tsx            ← sticky terminal-prompt nav
    Hero.tsx           ← headline + animated SVG pipeline visualizer
    TechStack.tsx      ← stack grouped by infrastructure layer
    Projects.tsx       ← expandable project cards with tabbed detail
    Dashboard.tsx      ← simulated live metrics with sparklines
    Snippets.tsx       ← syntax-highlighted SQL/Python/Terraform notes
    Contact.tsx        ← contact cards + footer
```
