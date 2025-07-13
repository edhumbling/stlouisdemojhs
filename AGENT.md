# AGENT.md - Development Guide

## Commands
- **Dev**: `npm run dev` (Vite dev server at localhost:5173)
- **Build**: `npm run build` (Production build to dist/)
- **Lint**: `npm run lint` (ESLint check)
- **Preview**: `npm run preview` (Preview production build)
- **Clean**: `npm run clean` (Clean dependencies)
- **Type Check**: `npx tsc --noEmit` (TypeScript check)

## Architecture
- **React 18.3.1 + TypeScript + Vite** SPA with React Router DOM
- **Structure**: `src/components/` (common, home, layout), `src/pages/`, `src/data/`, `src/types/`, `src/utils/`
- **Styling**: Tailwind CSS 3.4.1 + Framer Motion animations + MUI components
- **No tests configured** - add testing framework if needed
- **Deployment**: Optimized for Netlify/Vercel with SPA routing

## Code Style
- **TypeScript**: Strict mode enabled, use proper typing
- **Imports**: ES modules, prefer named imports
- **Components**: Functional components with hooks, PascalCase naming
- **Styling**: Tailwind classes, avoid inline styles
- **File naming**: PascalCase for components, camelCase for utils
- **ESLint**: Follow React hooks rules and TypeScript recommendations
