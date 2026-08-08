# Job Portal System — Project Rules & Conventions

This document defines the **strict rules and conventions** to be followed across the project. All agents/contributors **MUST read and acknowledge** these rules **before making any change** to the codebase. Consistent adherence ensures every agent produces code that looks like it came from one developer.

---

## Module 1 — Language & Architecture

1. **TypeScript Only**
   - Use TypeScript (`.ts` / `.tsx`) for both backend and frontend code.
   - No plain JavaScript files should be introduced into the codebase.

2. **Follow Existing Project Architecture**
   - All new code must follow the established folder structure, layering, and design patterns already present in the project.
   - Do not introduce a parallel or conflicting architecture.
   - **Backend layout:** feature modules under `backend/src/modules/<feature>/` split into `<feature>.controller.ts`, `<feature>.service.ts`, `<feature>.repository.ts`, `<feature>.route.ts`. Shared code lives in `backend/src/middleware/`, `backend/src/config/`, `backend/src/types/`.
   - **Frontend layout:** Next.js App Router under `frontend/app/` with route groups (e.g. `(features)`, `(auth)`), reusable UI in `frontend/components/ui/`, dashboard components in `frontend/components/dashboard/`, shared helpers in `frontend/lib/`.

3. **Naming Conventions**
   - Backend: use `feature.layer.ts` (singular, consistent). Example: `logout.service.ts`, NOT `logout.services.ts`.
   - Frontend: PascalCase for component files/components, camelCase for functions and variables.
   - Follow the exact naming style of the nearest existing file in the same folder.

4. **No Unnecessary New Libraries**
   - Do not add a new library/package unless it is genuinely required to implement a feature.
   - Before adding a dependency, confirm that the existing stack cannot already achieve the requirement (Express, Prisma, Zod, JWT, bcryptjs, cookie-parser, Next.js, Tailwind, shadcn/ui, lucide-react, etc.).
   - Any new library addition must be justified and communicated before implementation.

5. **Reuse Existing Components**
   - Search existing reusable components, hooks, utilities, and services before creating new ones.
   - Avoid duplicate implementations of the same functionality.

---

## Module 2 — Backend Conventions (Express + Prisma + Zod)

1. **Validation (Zod)**
   - Every request `body`, `query`, and `params` must be validated with a Zod schema in the route/controller layer.
   - Derive shared DTO types from the Zod schemas so validation and types never drift.
   - Never trust or pass unvalidated input to services/repositories.

2. **Type Safety**
   - Never use `any`. Use explicit types, generics, or `unknown` with narrowing.
   - Respect strict tsconfig flags (`strict`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`) — do not weaken or disable them.

3. **Error Handling**
   - Throw typed errors (e.g. `HttpError` / `AppError`) from services and controllers.
   - Use a centralized error-handling middleware to map errors to consistent JSON responses with proper status codes.
   - Never leak stack traces, internal details, or DB errors to the client in production responses.

4. **Response Contract**
   - Use a consistent response envelope, e.g. `{ success, data, error }` for all API responses.
   - Use standard REST verbs and RESTful resource paths.
   - Use consistent pagination/filter/sort query parameters for list endpoints.

5. **Authentication & Role-Based Access (RBAC)**
   - The system has three roles: `CANDIDATE`, `RECRUITER`, `ADMIN` (see Prisma `Role` enum).
   - Protect any route that requires a session with auth middleware; enforce role-based access per endpoint.
   - Keep auth state in httpOnly cookies (cookie-parser is in the stack). Rotate refresh tokens. Never store tokens in localStorage.
   - Place auth/role guards in the route layer so every endpoint's access is explicit and auditable.

6. **Logging**
   - Log meaningful events (auth events, errors, slow queries) without logging secrets, tokens, or full request bodies.

---

## Module 3 — Database & Prisma Rules

1. **Prisma Only (Repository Layer)**
   - Access the database exclusively through the Prisma client, always inside the `*.repository.ts` layer.
   - No raw SQL bypass unless absolutely required and explicitly justified.

2. **Soft Delete Convention**
   - The schema already includes `isDeleted` / `deletedAt` on user-facing models — ALWAYS use soft delete for user-facing data.
   - Hard deletes are only allowed for genuinely ephemeral data (e.g. tokens) and never without explicit approval.

3. **Transactions**
   - Wrap multi-step writes in `prisma.$transaction` to keep data consistent.

4. **Performance**
   - Use selective `select` / `include` to avoid N+1 query problems.
   - Follow existing index patterns; add `@@index` in the schema only when a new query path genuinely requires it.

5. **No Unnecessary Schema Changes**
   - Do not modify `backend/prisma/schema.prisma` unless the feature being developed explicitly requires a new or changed schema.

6. **Mandatory Notification for Schema Changes**
   - If a schema change is required, it must be communicated/notified in advance before implementation, including what is changing and why.
   - Never regenerate or rewrite the existing `init` migration — always add new migrations on top.

7. **No Deletion of Existing Database**
   - Never delete or drop the existing database, tables, or collections.
   - Destructive database operations are strictly prohibited without explicit approval.

8. **Never Edit Generated Code**
   - Do not modify files under `backend/generated/` — they are Prisma-generated and will be overwritten.

---

## Module 4 — Frontend Conventions (Next.js App Router)

1. **Server Components First**
   - Prefer Server Components by default. Add `"use client"` only for components that need state, effects, or browser APIs.

2. **Data Fetching**
   - Fetch data in Server Components or Server Actions, not inside client components.
   - Never expose secrets/env values to the client bundle (prefix client-safe variables with `NEXT_PUBLIC_` only when intentional).

3. **Styling (Tailwind v4 Theme Tokens)**
   - Use the design tokens defined in `frontend/app/globals.css` (e.g. `text-ink`, `text-ink-soft`, `text-ink-faint`, `bg-canvas`, `bg-paper`, `border-line`, `text-indigo-600`, `bg-indigo-500`) instead of hardcoded hex values.

4. **Components & Path Alias**
   - Use the `@/*` path alias (e.g. `@/components/ui/...`).
   - Build UI from existing shadcn/ui primitives and existing `components/ui/*` components.
   - Keep the split between `components/ui/` (shared UI) and `components/dashboard/` (dashboard-specific).

5. **Accessibility**
   - Interactive elements must be keyboard-accessible, have proper labels/`aria` attributes, and respect `prefers-reduced-motion` (existing pattern in `globals.css`).

---

## Module 5 — Security

1. **Protect Environment Secrets**
   - Never expose, log, commit, or hardcode values from the `.env` file.
   - Secrets (API keys, DB credentials, tokens, etc.) must remain in environment variables only and never be pushed to version control.

2. **Environment Configuration**
   - Keep a committed `.env.example` listing all required variables (with placeholder values only).
   - Validate environment variables at startup (e.g. via Zod in `backend/src/config/`) so misconfiguration fails fast.

3. **Input Safety & CORS**
   - Validate and sanitize all inputs (see Module 2). Never concatenate user input into queries.
   - Keep CORS restricted to known/trusted origins.

---

## Module 6 — Testing & Quality Gates

1. **Testing**
   - Write unit tests for services and repositories and validation tests for route schemas as business logic is added.
   - Use a test framework consistent with the repo (add one, e.g. Vitest, before business logic grows — the current `test` script in `backend/package.json` is a stub).

2. **Quality Gate (Mandatory Before Completion)**
   - `lint` must pass with no errors.
   - TypeScript must compile cleanly (`tsc --noEmit` for the backend, `next build` for the frontend).
   - Never mark a task complete with failing lint, type errors, or a broken build.

---

## Module 7 — Git & Collaboration

1. **Branches** — One branch per feature/fix, named descriptively (e.g. `feature/job-filtering`, `fix/login-validation`).
2. **Commits** — Use concise, conventional commit messages that describe what changed and why (e.g. `feat(auth): add refresh token rotation`).
3. **No Generated Files** — Do not commit `node_modules`, `.env`, generated Prisma client output, or build artifacts (all already covered in `.gitignore`).
4. **Schema/DB Changes** — Never push destructive DB changes or schema migrations without the mandatory notification from Module 3.

---

## Mandatory Agent Workflow Before Any Change

1. **Read this rules file first** (`agents/rules/project.md`).
2. **Explore the relevant existing code** before writing new code — match its style, structure, and patterns.
3. **Confirm the plan** with the team/requester before making changes that affect schema, architecture, or add dependencies.
4. **Make the change** following every module above.
5. **Verify quality gates** (lint + typecheck/build) before finishing.
6. **Do not modify** generated files, existing migrations, or the database without approval.

---

## Summary Checklist (Verify Before Completing Any Task)

- [ ] TypeScript only (backend & frontend) — no `.js`
- [ ] Follows existing feature-based architecture & naming conventions
- [ ] No new library added without necessity check + communication
- [ ] Existing components/services/hooks reused where possible
- [ ] Zod validation on all request inputs; no `any`
- [ ] Centralized error handling + consistent `{ success, data, error }` envelope
- [ ] Auth middleware + RBAC (CANDIDATE / RECRUITER / ADMIN) on protected routes
- [ ] Prisma repository-only access; soft deletes used; transactions for multi-step writes
- [ ] No schema change without notification; no DB deletion; no editing generated code
- [ ] Server Components first; Tailwind theme tokens; `@/*` alias used
- [ ] `.env` secrets never exposed; `.env.example` committed; env validated at startup
- [ ] Lint + typecheck/build pass; tests added for new logic
- [ ] Conventional commits; no generated/build files committed

