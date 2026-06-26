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

---

## Project Structure

```
MCP-Changelog/
├── catalyst.json          # Catalyst project config (Slate source pointer)
├── client/                # Catalyst static client placeholder
└── web-source/            # React application source
    ├── src/
    │   ├── components/    # UI components (Header, Sidebar, ReleaseList, etc.)
    │   │   └── filters/   # CalendarFilter, ServicesFilter, DCFilter
    │   ├── context/       # LanguageContext (React context for i18n)
    │   ├── data/          # releases.ts, constants.ts, translations.ts
    │   └── types/         # Shared TypeScript types
    ├── public/
    │   └── logos/         # 86 SVG product logos (Zoho + third-party)
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

### Deploy

```bash
# From the MCP-Changelog project root
catalyst deploy slate -m "your commit message"
```

Catalyst Slate automatically handles:
- Cloud dependency installation
- Vite production build
- Static asset serving with CDN edge caching

---

## Adding Releases

All release data lives in [`web-source/src/data/releases.ts`](web-source/src/data/releases.ts). Each release entry follows the `Release` type:

```ts
{
  id: string;           // unique ID
  date: string;         // "YYYY-MM-DD"
  title: string;
  description: string;
  category: ReleaseCategory;
  services: string[];   // must match entries in ALL_SERVICES
  dataCenters: DataCenter[];
}
```

After adding entries, rebuild and redeploy with `catalyst deploy slate`.

---

## License

Internal Zoho project. All rights reserved.
