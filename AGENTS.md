# AGENTS.md

> Kopkar HR — Enterprise Human Resource Management frontend.

## Project Identity

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Bun  
The project adapted for a multi-backend HR platform.

## Goal

Build a scalable, modular HR platform where **features are fully isolated**, **backends are domain-coupled**, and **any module can be added, removed, or extracted with zero cross-impact**.

## Core Principles

1. **Unidirectional flow** — `shared → features → app`. Never import across features or upward.
2. **Domain-coupled backends** — Each feature maps to exactly one Axios client. Never mix clients.
3. **Stratified state** — Server state (TanStack Query), global UI (Zustand), URL (searchParams), forms (RHF + Zod). Use the right layer.
4. **Zero-trust auth** — JWT in HttpOnly cookies only. Client authorization is UI-only; server enforces.
5. **Simplicity first** — No speculative abstractions. One file per API endpoint. No barrel exports from features.

## Architecture

```
shared (components, hooks, lib, utils, types, config, stores)
                    ↓
        features/[domain]/[feature]/
                    ↓
          app/(protected)/ and app/(auth)/
```

### Backend Map

| Feature                       | Client               | Backend      |
| ----------------------------- | -------------------- | ------------ |
| employee, recruitment, safety | `hrClient`           | Go :8080     |
| attendance                    | `attendanceClient`   | Go :3001     |
| compensation                  | `compensationClient` | NestJS :3002 |

### Route Groups

- `app/(auth)/` — Public auth pages (no session required)
- `app/(protected)/` — Authenticated routes (AuthProvider guards)
- `app/api/` — BFF / proxy routes

## Commands

```bash
bun run dev          # Dev server :3000
bun run build        # Production build
bun run test         # Vitest (one-shot)
bun run lint         # ESLint
bun run format       # Prettier
```

## Extended Rules

Detailed conventions for code style, components, state management, testing, and feature structure live in `.agents/rules/`. Read them before making changes.
