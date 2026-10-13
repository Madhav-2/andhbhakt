# Fair Go — Australian edition

The default frontend is now the Australian edition. The original India app and server remain in source; the Australian frontend does not query the India database or news feed.

## Run locally

```sh
pnpm install --frozen-lockfile
pnpm --filter @workspace/govlens dev
```

Use pnpm 10 with the existing lockfile. Open http://localhost:3000. No database or API credentials are needed for the Australian edition. Build with `pnpm --filter @workspace/govlens build`. Serve `artifacts/govlens/dist/public` with an SPA fallback to index.html.

## Content and scope

`artifacts/govlens/src/australia/data.ts` contains the Australian records and citations. Each record distinguishes its reporting period, evidence type, caveat and primary source. The collection is manually curated, not live. Its review date is 13 October 2026.

Includes program search, topic/evidence filters, evidence detail pages, ANAO audit records, eight state/territory source guides, parliamentary disclosure links, political funding links, outcome sources and JSON download. Minister profiles, manifesto histories, quantitative rankings, donation imports and automatic ingestion are not yet compiled. Missing data is not represented as a zero or a negative score.

The Australian UI is isolated in `artifacts/govlens/src/australia/`. `src/main.tsx` selects it. The original `src/App.tsx`, India data and API are retained for future development, but are not part of the Australian app's runtime imports. Do not seed the original India database expecting Australian records.

The working title is Fair Go Australia; no domain, deployment, external repository or organisational affiliation is claimed.
