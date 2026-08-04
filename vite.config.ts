import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base is set for GitHub Pages project-site hosting:
// https://rakshithnarayanaswamy.github.io/portfolio/
// If you rename the repo, change `base` to match. For a user site
// (a repo named rakshithnarayanaswamy.github.io) set base to '/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/portfolio/',
})
