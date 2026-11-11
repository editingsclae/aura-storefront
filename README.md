# Aura Storefront

An editorial, luxury skincare storefront designed with warm earthy tones, Cormorant Garamond serif headings, and clean minimal typography, built on top of the modular Medusa v2 e-commerce base.

## Overview

Aura Storefront couples the aesthetic of the AURA skincare brand with full e-commerce capabilities:
- **Design Language**: Warm earthy neutrals (`#f3ede5`, `#f7f4ef`, `#d9cdbd`, `#1c1a17`), serif typography (Cormorant Garamond), uppercase tracking, and split-layout editorial visuals.
- **Backend Architecture**: Powered by Medusa v2 via the Cardy e-commerce backend, maintaining separation between the immutable logic layer (`src/logic`, `src/lib`, `src/context`) and the presentation layer (`src/components`, `src/app`).
- **Complete Customer Journey**: Browse home, shop catalog with dynamic filtering and sorting, category views, product details with image galleries and variant selection, slide-over cart drawer and full cart page, multi-step cash-on-delivery checkout, order confirmation, and customer account dashboard.

## Environment Variables

Configure the following variables in `.env.local`:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | URL of the Medusa backend API (e.g., `https://api.getcardy.shop`). |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Merchant publishable API key for Medusa storefront authentication. |
| `NEXT_PUBLIC_STORE_NAME` | Display name of the store used across the header, footer, and page titles. |
| `STOREFRONT_LAYOUT_KEY` | Synchronization key from the portal (Appearance > Promo banners > Storefront connection) allowing the storefront to register its layout capacity with the backend. |

## Build & Development

### Windows Build Command

On Windows, always build with the `--webpack` flag:

```bash
npx next build --webpack
```

> **Note:** Turbopack's Tailwind v4 loader encounters native path / permission issues on Windows. The `--webpack` flag ensures a clean, reproducible production build.

### Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Validation & Testing

Run all linters, TypeScript type checks, and unit tests:

```bash
npm run check
```

Or run the test suite directly:

```bash
npm test
```
