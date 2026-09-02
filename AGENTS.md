# Base44 Setup Notes

## Overview
This is a Next.js 16 app (Sales Call Summary Agent) using Turbopack. It uses the
Vercel AI SDK v6 (via the Vercel AI Gateway), the Vercel Workflow SDK, and
`@vercel/sandbox` for isolated code execution.

## Running
- `docker compose -f docker-compose.base44.yml up -d` starts the dev server on port 3000.
- The container runs `npm install` then `npx next dev -p 3000 -H 0.0.0.0`.
- `node_modules` is a named volume (not bind-mounted) to avoid host pollution.
- File-watch polling is enabled (`CHOKIDAR_USEPOLLING`, `WATCHPACK_POLLING`) for bind-mount reliability.

## Next.js config
- `allowedDevOrigins` is derived from `BASE44_PUBLIC_HOST_SUFFIX` in `next.config.ts`
  so the preview's external origin can load `_next` dev assets (HMR, chunks).

## Demo mode
- The status page (`app/page.tsx`) renders in demo mode by default — no credentials needed.
- `isDemoMode()` returns true when `GONG_ACCESS_KEY`/`GONG_SECRET_KEY` are absent.

## Credentials (for "Run Demo" agent only — not needed to boot)
- `AI_GATEWAY_API_KEY` — Vercel AI Gateway key for the model `anthropic/claude-haiku-4-5`.
  Falls back to `VERCEL_OIDC_TOKEN` (OIDC auth) if not set.
- `VERCEL_OIDC_TOKEN` — Vercel OIDC JWT for `@vercel/sandbox` (Sandbox.create).
  Obtain via `vercel link` + `vercel env pull` in a linked Vercel project.
- Both are optional at boot; only required when clicking "Run Demo".

## Verification
- `curl -sf -H "Host: <external>" http://localhost:3000/` returns the page (200).
- `_next` dev assets return 200 with the real preview origin (allowedDevOrigins).
