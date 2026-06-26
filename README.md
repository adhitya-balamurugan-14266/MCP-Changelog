# MCP Changelog

A polished, real-time changelog web application for **Zoho MCP** — tracking every new service, new tool, enhancement, and change shipped across the Zoho MCP platform.

🌐 **Live App:** [https://mcp-changelog.onslate.in/](https://mcp-changelog.onslate.in/)

---

## Overview

MCP Changelog gives users a running log of everything new, improved, and shipped across Zoho MCP. Releases are organized by date, filterable by category, service, data center, and month — with full-text search and bilingual support.

---

## Features

- **Release feed** — Chronological list of releases grouped by month, each showing category badge, date, affected services (with product logos), data center chips, and a description
- **Category tabs** — Filter by: New Service · New Tool · Enhancement · Tool Change · Tool Removed · Service Removed
- **Sidebar filters** — Filter by month (collapsible by year), service (44 Zoho + third-party services), and data center (US · EU · IN · AU · JP · CN · CA · SA)
- **Full-text search** — Searches across release title, description, services, and category
- **Bilingual UI** — English and Español; all labels, filters, and placeholders translate instantly
- **Dark / Light theme** — Persisted to `localStorage`, defaults to system preference
- **Sticky sidebar** — Filter panel stays in view as you scroll through releases
- **Interactive Back to Top** — Circular scroll-progress ring with hover animation
- **Header links** — Quick access to [MCP Console](https://mcp.zoho.in/) and [Help Docs](https://help.zoho.com/portal/en/kb/mcp)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Icons | Lucide React |
| Hosting | Zoho Catalyst Slate (cloud build + CDN) |
| Asset Storage | Zoho Catalyst Stratus (public object storage CDN) |
| Backend | Zoho Catalyst Serverless Functions (Node.js 20, Advanced I/O) |

---

## Project Structure

```
MCP-Changelog/
├── catalyst.json              # Catalyst project config (Slate + Functions)
├── client/                    # Catalyst static client placeholder
├── functions/
│   └── asset_manager/         # Serverless function — manages Stratus assets
│       ├── index.js           # POST /upload · DELETE /delete · POST /init-logos
│       ├── package.json
│       ├── catalyst-config.json
│       └── logos/             # Bundled logo files (source for init-logos)
└── web-source/                # React application source
    ├── src/
    │   ├── components/        # UI components (Header, Sidebar, ReleaseList, etc.)
    │   │   └── filters/       # CalendarFilter, ServicesFilter, DCFilter
    │   ├── context/           # LanguageContext (React context for i18n)
    │   ├── data/              # releases.ts, constants.ts, translations.ts
    │   └── types/             # Shared TypeScript types
    ├── public/                # Static assets (no logos — served from Stratus)
    ├── index.html
    ├── vite.config.ts
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- [Zoho Catalyst CLI](https://docs.catalyst.zoho.com/en/cli/v1/getting-started/) (for deployment)

### Local Development

```bash
cd web-source
npm install
npm run dev
```

### Production Build

```bash
cd web-source
npm run build
```

Output is written to `web-source/dist/`.

---

## Deployment

The app is hosted on **Zoho Catalyst Slate** — a cloud build and serve platform. Catalyst Slate pulls the `web-source/` directory, runs `npm install && npm run build` in the cloud, and serves the resulting `dist/` folder over a global CDN.

Product logos are stored in **Catalyst Stratus** (public object storage) at:
```
https://mcp-changelog-logos-development.zohostratus.in/{filename}
```
This keeps the Slate bundle lean — only HTML, CSS, and JS are shipped; logos are fetched from the Stratus CDN at runtime.

### Deploy

```bash
# From the MCP-Changelog project root
catalyst deploy
```

Deploys both the `asset_manager` function and the Slate app together.

To deploy only the Slate app (no function changes):

```bash
catalyst deploy --only slate
```

### Populate / Refresh Logos in Stratus

The `asset_manager` function bundles all logos in its `logos/` directory. After any function deployment, call:

```bash
curl -X POST https://mcp-changelog-60047186223.development.catalystserverless.in/server/asset_manager/init-logos
```

This uploads all bundled logos to the Stratus bucket (safe to re-run; uses `overwrite: true`).

### Upload a New Logo

```bash
# Encode the SVG as base64, then POST to the upload endpoint
base64 -i NewService-whiteBG.svg | \
  xargs -I{} curl -s -X POST \
    https://mcp-changelog-60047186223.development.catalystserverless.in/server/asset_manager/upload \
    -H "Content-Type: application/json" \
    -d "{\"key\": \"NewService-whiteBG.svg\", \"content\": \"{}\"}"
```

No redeployment needed — the logo is live in Stratus immediately.

---

## Adding Releases

All release data lives in [`web-source/src/data/releases.ts`](web-source/src/data/releases.ts). Each release entry follows the `Release` type:

```ts
{
  id: string;                   // unique ID e.g. "jun-2026-01"
  date: string;                 // "YYYY-MM-DD"
  title: string;                // e.g. "Zoho CRM has added 45 new tools"
  description: string;
  category: ReleaseCategory;    // "New Service" | "New Tool" | "Enhancement" | "Tool Change" | "Tool Removed" | "Service Removed"
  services: string[];           // must match entries in ALL_SERVICES (constants.ts)
  dataCenters: DataCenter[];
  newTools?: string[];          // shown for New Tool / New Service / Enhancement
  removedTools?: string[];      // shown for Tool Removed / Tool Change
}
```

**Title format rules:**
- `New Tool` (multiple): `[Service] has added [N] new [topic] tools`
- `New Tool` (single): `[Service] has added the [toolName] tool`
- `Tool Removed` (multiple): `[Service] has removed [N] [topic] tools`
- `Tool Removed` (single): `[Service] has removed the [toolName] tool`
- `New Service`: `[Service] is now available in Zoho MCP`
- `Tool Change`: `[Service] has updated [toolName]` *(only for renamed/signature-changed tools)*

> If a service both adds **and** removes tools in the same release, create two separate entries — one `New Tool` and one `Tool Removed`.

After adding entries, rebuild and redeploy:

```bash
cd web-source && npm run build && cp -r dist/* ../client/
cd .. && catalyst deploy --only slate
```

## Adding a New Service Logo

1. Add the SVG file to `functions/asset_manager/logos/`
2. Add the Stratus URL entry to `SERVICE_LOGOS` in `web-source/src/data/constants.ts`:
   ```ts
   'Zoho NewService': 'https://mcp-changelog-logos-development.zohostratus.in/NewService-whiteBG.svg',
   ```
3. Deploy the function and call `init-logos` (or use the `/upload` endpoint for a no-deploy path):
   ```bash
   catalyst deploy  # redeploys function with new logo bundled
   curl -X POST https://mcp-changelog-60047186223.development.catalystserverless.in/server/asset_manager/init-logos
   ```
4. Rebuild and redeploy Slate with the updated `constants.ts`.

---

## License

Internal Zoho project. All rights reserved.
