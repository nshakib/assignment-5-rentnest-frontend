# RentNest — Frontend

A modern, responsive rental property marketplace built with Next.js. Landlords list and manage properties, tenants browse and request rentals with integrated payments, and admins moderate the platform.

> Frontend-only assignment — consumes a separate backend API (Express + Prisma + PostgreSQL).

---

## Tech Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Zod** — schema validation (paired with native `useActionState` + `FormData`)
- **Zustand** — global client state (property filters, sidebar toggle)
- **Sonner** — toast notifications
- **Stripe** — subscription-based rent payments (Checkout redirect)
- **Prisma** (backend) — PostgreSQL ORM

---

## Roles

| Role | Capabilities |
|---|---|
| **Tenant** | Browse/filter properties, submit rental requests, pay rent via Stripe, view payment history, leave reviews |
| **Landlord** | Create/edit/delete property listings, manage incoming rental requests (approve/reject), view overview stats |
| **Admin** | Manage all users (ban/unban), moderate all properties and rental requests platform-wide |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### 2. Environment variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
```

(Replace with your deployed backend URL in production — see `API_INTEGRATION.md` for the full list of consumed endpoints.)

### 3. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
  app/
    (authGroup)/        → /login, /register
    (publicGroup)/       → home, /properties, /properties/[id]
    (dashboardGroup)/    → /tenant-dashboard, /landlord-dashboard, /admin-dashboard
  components/
    ui/                   → shadcn/ui primitives
    shared/                → Navbar and other cross-group components
  lib/
    types.ts               → shared TypeScript interfaces
    validators/             → Zod schemas
  service/
    getMe.ts                → fetches current authenticated user
    refreshToken.ts          → token refresh + auth check for Server Actions
  store/
    property-filter-store.ts → global filter state (city, category, rent range)
    sidebar-store.ts          → global mobile sidebar open/close state
  proxy.ts                  → route protection & role-based access (Next.js 16 middleware)
```

Each route group (`_actions`, `_components`) colocates its own Server Actions and components, following the pattern documented in `API_INTEGRATION.md`.

---

## Key Architectural Notes

- **Auth flow**: `proxy.ts` handles route protection and transparent access-token refresh at the edge. Server Actions independently verify auth via `isAccessTokenExist()` as the real authorization boundary.
- **Forms**: use native `useActionState` + `FormData`, validated with Zod inside each Server Action (per the assignment's "Next.js Server Actions with Zod" option) rather than React Hook Form.
- **Payments**: Stripe Checkout in `subscription` mode — tenants are billed monthly for the lease duration. See `API_INTEGRATION.md` for the full payment flow and webhook handling.
- **Cache invalidation**: `updateTag()` is called after every mutation for immediate read-your-own-writes consistency across landlord, tenant, and admin views.
- **Global client state**: Zustand handles state genuinely shared across unrelated components without prop drilling — property filter values (`usePropertyFilterStore`, synced with URL search params) and the dashboard's mobile sidebar toggle (`useSidebarStore`). All other data comes from Server Components/Server Actions, not client state.

---

## Deployment

- **Frontend**: Vercel
- **Backend**: Render

When deploying, set these environment variables on each platform:

**Vercel (frontend)**
```
NEXT_PUBLIC_BACKEND_API_URL=<your-render-backend-url>
```

**Render (backend)**
```
APP_URL=<your-vercel-frontend-url>
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
DATABASE_URL=...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
```

Register the production webhook endpoint in the Stripe Dashboard: `https://<your-backend>/api/payments/webhook`.

---

## Test / Admin Credentials

```
# admin
"email": "admin@rentalapp2.com",
"password": "AdminSecure789!"

#tenant
tenant@test.com
12345678

#landlord
landlord@test.com
12345678
```

---

## API Documentation

See [`API_INTEGRATION.md`](./API_INTEGRATION.md) for the complete mapping of frontend components to backend endpoints.