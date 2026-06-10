# AGENTS.md

### Quick Start Commands

```bash
bun run dev           # Start development server (http://localhost:3000)
bun run build         # Production build
bun run build:staging # Build with .env.staging overrides
bun run lint          # ESLint
bun run format        # Prettier (auto-fix)
bun run test          # Vitest — unit + integration tests (one-shot)
bun run test:watch    # Vitest — watch mode
```

> **Package manager:** `bun` (not npm/yarn/pnpm). Always use `bun` to install dependencies.

---

# Architectural Rules & Core Principles

This document defines the highly structured, scalable, and decoupled frontend architecture tailored for this multi-backend enterprise application.

## 1. Strict Unidirectional Dependency Flow (Feature-Sliced Design)

Our project implements a variation of **Feature-Sliced Design (FSD)**. The core philosophy is predictability through strict boundary enforcement.

- **The Flow:** `shared` -> `features` -> `app`
- **Why:** In standard React apps, components easily become entangled. By strictly forbidding features from importing from each other, we guarantee **horizontal scalability**. If a feature needs to be extracted into a separate micro-frontend or completely deleted, other features remain entirely unaffected.
- **Enforcement:** Statically analyzed and blocked at compile time via `eslint-plugin-import` (`import/no-restricted-paths`).

## 2. Frontend-as-a-Gateway (Microservices Fronting)

Rather than relying on a backend API Gateway to route requests, our Next.js application acts as a decentralized gateway connecting directly to isolated microservices.

- **Clients:**
  - `hrClient` (Go, port 8080)
  - `attendanceClient` (Go, port 3001)
  - `compensationClient` (NestJS, port 3002)
- **Why:** Enforces **Domain-Driven Design (DDD)** at the network layer. Strictly coupling a feature folder to a specific Axios instance prevents accidental data leakage or cross-domain monolithic queries. It forces the frontend to act as the composer of state, keeping the backends completely decoupled. Never mix clients.

## 3. Stratified State Management Architecture

We mandate a highly stratified approach to state. Do not overuse global stores.

- **Server State (TanStack Query v5):** The single source of truth for asynchronous data. Handles caching, deduplication, and stale-while-revalidate (SWR) mechanics.
- **Application/Global State (Zustand):** Restricted _only_ to purely global, non-persisted UI states (e.g., `ui-store.ts` for sidebar toggles, `notifications-store.ts` for toasts). Do not add new stores unless clearly justified.
- **URL State (`useSearchParams`):** The URL is treated as the primary store for filters, pagination, and selected entities. Enables deep-linking and browser history traversal without React state synchronization nightmares.
- **Form State (React Hook Form + Zod):** Forms are entirely uncontrolled and validate mathematically via Zod schemas, minimizing re-renders.

## 4. Zero-Trust Client Authentication

Our authentication rules bypass modern wrappers like NextAuth in favor of a highly specific, secure custom implementation.

- **HttpOnly Cookies:** JWTs are strictly forbidden from residing in `localStorage`. This neutralizes **Cross-Site Scripting (XSS)** attacks, as malicious scripts cannot read HttpOnly cookies.
- **Client-Side UI, Server-Side Enforcement:** The frontend uses role-based access control (RBAC) purely for UI rendering (hiding/showing buttons). Actual authorization is deferred entirely to the backend, acknowledging that _all client-side code is compromised by default_.

## 5. Deterministic Styling & Component Primitives

- **Tailwind v4 (CSS-only):** Abandoning `tailwind.config.js` in favor of native CSS `@theme` tokens (`config.reui.css`), leveraging modern browser capabilities (CSS variables) for zero-runtime dynamic theming.
- **Radix Primitives:** Utilizing unstyled Radix components ensures WAI-ARIA compliant accessibility (keyboard navigation, screen readers) out of the box, leaving Tailwind to handle pure aesthetics via `class-variance-authority` (CVA).

## 6. Network-Agnostic Integration Testing (MSW)

- **Mock Service Worker (MSW):** We intercept HTTP requests at the network level rather than mocking `axios` or `fetch`.
- **Why:** Vitest integration tests run against the exact same data-fetching logic as production. If a TanStack Query hook modifies headers or transforms a payload, the MSW test will catch it, whereas a simple Axios mock would blindly pass.
