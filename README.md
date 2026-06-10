# Metronic Demos — Tailwind CSS + Next.js

> **Package:** `metronic-nextjs` · **Version:** 9.4.7 · By [Keenthemes](https://keenthemes.com/metronic)

The full-featured demo application for **Metronic v9.4.7**, built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **Prisma + PostgreSQL**. It showcases 39 distinct admin dashboard layout variants, authentication flows, user management, i18n, and several complete application modules.

---

## Table of Contents

- [Overview](#overview)
- [Included Demos & Modules](#included-demos--modules)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Switching Layouts](#switching-layouts)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [Internationalisation (i18n)](#internationalisation-i18n)
- [Data Model](#data-model)
- [Hooks](#hooks)
- [Support](#support)

---

## Overview

This package ships the complete Metronic demo site used on the Keenthemes preview. It is the reference implementation for everything Metronic can do: 39 layout demos, full authentication (sign-in, sign-up, email verification, password reset), a role-based user management system backed by a real PostgreSQL database, file uploads to AWS S3, i18n, and multiple feature application modules.

It is built on top of [ReUI](https://v1.reui.io) — Keenthemes' open-source React component library.

---

## Included Demos & Modules

### Layout Demos (39 variants)

Found under `app/(protected)/` — switch between them by changing the layout wrapper in `app/(protected)/layout.tsx`:

| Range              | Description                                |
| ------------------ | ------------------------------------------ |
| `demo1` – `demo39` | Full sidebar/header/topbar layout variants |

### Application Modules

| Module              | Route                          | Description                                           |
| ------------------- | ------------------------------ | ----------------------------------------------------- |
| **Account**         | `/(protected)/account`         | Profile settings, appearance, billing, security       |
| **Auth**            | `/(auth)`                      | Sign-in, sign-up, verify email, reset/change password |
| **Dark Sidebar**    | `/(protected)/dark-sidebar`    | Sidebar theme demo                                    |
| **i18n Test**       | `/(protected)/i18n-test`       | Internationalisation language switching demo          |
| **Network**         | `/(protected)/network`         | Social network / people directory                     |
| **Public Profile**  | `/(protected)/public-profile`  | User public profile pages                             |
| **Store Admin**     | `/(protected)/store-admin`     | Admin-side e-commerce store management                |
| **Store Client**    | `/(protected)/store-client`    | Client-facing e-commerce store                        |
| **User Management** | `/(protected)/user-management` | Full CRUD user & role management with Prisma          |

---

## Tech Stack

| Category             | Library / Tool                                       |
| -------------------- | ---------------------------------------------------- |
| Framework            | Next.js 16 (`standalone` output)                     |
| Language             | TypeScript · React 19                                |
| Styling              | Tailwind CSS 4 · `class-variance-authority` · `clsx` |
| UI Primitives        | Radix UI · React Aria Components                     |
| Icons                | Lucide React · Remix Icon                            |
| Charts               | ApexCharts 4.7 + `react-apexcharts`                  |
| Data Tables          | TanStack Table v8                                    |
| Data Fetching        | TanStack Query v5                                    |
| Forms                | React Hook Form + Zod (`@hookform/resolvers`)        |
| Authentication       | NextAuth v4 + `@auth/prisma-adapter`                 |
| ORM                  | Prisma (PostgreSQL)                                  |
| File Uploads         | AWS S3 (`@aws-sdk/client-s3`)                        |
| Email                | Nodemailer                                           |
| Drag & Drop          | `@dnd-kit` suite                                     |
| Tree View            | `@headless-tree/react`                               |
| Maps                 | Leaflet                                              |
| Carousel             | Embla Carousel                                       |
| Animation            | Motion                                               |
| Internationalisation | `i18next` · `react-i18next` · `next-i18next`         |
| Date Utils           | `date-fns`                                           |
| Theming              | `next-themes`                                        |
| Data Seeding         | `@faker-js/faker`                                    |

---

## Project Structure

```
metronic-tailwind-nextjs-demos/
├── app/
│   ├── layout.tsx
│   ├── (auth)/                 # Public auth routes
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── verify-email/
│   │   ├── reset-password/
│   │   └── change-password/
│   ├── (protected)/            # Authenticated routes
│   │   ├── layout.tsx          # ← Change demo layout here
│   │   ├── page.tsx
│   │   ├── account/
│   │   ├── dark-sidebar/
│   │   ├── i18n-test/
│   │   ├── network/
│   │   ├── public-profile/
│   │   ├── store-admin/
│   │   ├── store-client/
│   │   └── user-management/
│   ├── api/                    # Next.js API routes
│   ├── components/             # App-level server components
│   └── models/                 # Shared data/type models
├── components/
│   ├── common/                 # Shared UI (navbar, footer, etc.)
│   ├── examples/               # Component usage examples
│   ├── image-input/            # Image upload input widget
│   ├── keenicons/              # Keenthemes icon set
│   └── ui/                     # Radix-based UI primitives
├── config/
│   ├── general.config.ts       # Global links (purchase, docs, support)
│   ├── menu.config.tsx         # Sidebar navigation tree
│   ├── settings.config.ts      # Per-demo layout settings
│   └── types.ts                # Config TypeScript types
├── css/
│   ├── config.reui.css         # ReUI design tokens
│   └── styles.css              # Global styles
├── hooks/                      # Custom React hooks
├── i18n/                       # i18n config, messages, timezones
│   └── messages/               # Locale JSON files
├── lib/                        # Utility helpers
│   ├── api.ts                  # API client helpers
│   ├── db.ts                   # Database helpers
│   ├── dom.ts                  # DOM utilities
│   ├── helpers.ts              # General helpers
│   └── prisma.ts               # Prisma client singleton
├── prisma/
│   ├── schema.prisma           # Prisma data model
│   ├── seed.js                 # Database seeder
│   ├── setup.js                # Setup script
│   └── data/                   # Seed data files
├── providers/                  # React context providers
├── services/                   # Server-side service functions
├── types/                      # Shared TypeScript types
├── public/                     # Static assets
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 16
- **npm** ≥ 9 (or `yarn` / `pnpm`)
- **PostgreSQL** 17.4 or higher
- **Tailwind CSS** 4.x

### 1. Install Dependencies

```bash
npm install --force
```

> The `--force` flag is required to resolve React 19 peer dependency conflicts.

### 2. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Key environment variables:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email (Nodemailer)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# AWS S3 (for file uploads)
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
```

---

## Database Setup

### 1. Push the Schema

Creates all necessary tables from `prisma/schema.prisma`:

```bash
npx prisma db push
```

### 2. Generate the Prisma Client

```bash
npx prisma generate
```

### 3. Seed the Database (optional)

Populates the database with demo data using Faker.js:

```bash
node prisma/seed.js
```

### 4. Run Setup Script (optional)

```bash
node prisma/setup.js
```

### Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Switching Layouts

Open [app/(protected)/layout.tsx](<app/(protected)/layout.tsx>) and replace the layout component. The project ships 39 layout demos:

```tsx
// Before
<Demo1Layout>{children}</Demo1Layout>

// After — switch to any demo from Demo1 to Demo39
<Demo5Layout>{children}</Demo5Layout>
```

Layout settings (sticky header offsets, sidebar collapse defaults, etc.) are controlled per-demo in [config/settings.config.ts](config/settings.config.ts).

---

## Scripts

| Script                  | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `npm run dev`           | Start the Next.js development server             |
| `npm run build`         | Create an optimised production build             |
| `npm run start`         | Serve the production build locally               |
| `npm run build:staging` | Build using `.env.staging` environment overrides |
| `npm run lint`          | Run ESLint                                       |
| `npm run format`        | Auto-format with Prettier                        |
| `node prisma/seed.js`   | Seed the database with demo data                 |
| `node prisma/setup.js`  | Run database setup tasks                         |

---

## Configuration

| File                        | Purpose                                                       |
| --------------------------- | ------------------------------------------------------------- |
| `config/general.config.ts`  | Global links: purchase URL, docs, support, FAQ                |
| `config/menu.config.tsx`    | Sidebar navigation tree definition                            |
| `config/settings.config.ts` | Per-demo layout defaults (header sticky, sidebar theme, etc.) |
| `config/types.ts`           | TypeScript types for the config objects                       |
| `next.config.mjs`           | Next.js config — `standalone` output, `basePath`              |
| `css/config.reui.css`       | ReUI design-token CSS variables                               |

---

## Authentication

Authentication is handled by **NextAuth v4** with the **Prisma adapter**. Supported flows:

- Email + password sign-in
- Sign-up with email verification
- Password reset (token-based, via Nodemailer)
- Change password for authenticated users
- Session management (JWT + database sessions)

All auth routes live under `app/(auth)/` and are accessible without authentication.

---

## Internationalisation (i18n)

Built with `i18next` and `react-i18next`. Locale message files are located in `i18n/messages/`. The `i18n/config.ts` file defines supported locales and the default language. Use the `useTranslation` hook from `hooks/useTranslation.ts` in client components.

---

## Data Model

The Prisma schema (`prisma/schema.prisma`) defines the following core models:

| Model       | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| `User`      | Application users with status, role, avatar, and auth metadata |
| `UserRole`  | Role definitions (slug, name, description)                     |
| `Account`   | OAuth provider accounts linked to a `User`                     |
| `Session`   | NextAuth database sessions                                     |
| `SystemLog` | Audit trail for user actions                                   |

The database uses **PostgreSQL** as the provider. Both `DATABASE_URL` (pooled) and `DIRECT_URL` (direct) connection strings are supported for environments like Supabase.

---

## Hooks

| Hook                       | Description                                    |
| -------------------------- | ---------------------------------------------- |
| `use-body-class.ts`        | Adds/removes CSS classes on `<body>`           |
| `use-copy-to-clipboard.ts` | Clipboard write with feedback state            |
| `use-file-upload.ts`       | File input + preview + upload state management |
| `use-menu.ts`              | Sidebar menu open/close/active state           |
| `use-mobile.tsx`           | Detects mobile viewport                        |
| `use-mounted.ts`           | Prevents SSR hydration mismatches              |
| `use-recaptcha-v2.ts`      | Google reCAPTCHA v2 integration                |
| `use-scroll-position.ts`   | Tracks scroll Y position                       |
| `use-slider-input.ts`      | Syncs a range input with controlled state      |
| `use-viewport.ts`          | Returns viewport dimensions                    |
| `useTranslation.ts`        | Typed i18next translation hook                 |

---

## Support

- Documentation: [https://docs.keenthemes.com/metronic-nextjs](https://docs.keenthemes.com/metronic-nextjs)
- Community & Support: [https://devs.keenthemes.com](https://devs.keenthemes.com)
- Issues / Suggestions: [support@keenthemes.com](mailto:support@keenthemes.com)
- Purchase: [https://1.envato.market/Vm7VRE](https://1.envato.market/Vm7VRE)
