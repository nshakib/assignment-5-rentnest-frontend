# API Integration — RentNest Frontend

This document maps each frontend component/page to the backend API endpoint(s) it consumes.

**Backend base URL:** set via `NEXT_PUBLIC_BACKEND_API_URL` in `.env.local`

---

## Authentication

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `LoginForm` (`(authGroup)/_component/LoginForm.tsx`, route `/login`) → `loginAction` (`(authGroup)/_actions/authActions.ts`) | POST | `/api/auth/login` | Sets `accessToken` / `refreshToken` cookies |
| `RegisterForm` (`(authGroup)/_component/RegisterForm.tsx`, route `/register`) → `registerAction` (`(authGroup)/_actions/authActions.ts`) | POST | `/api/auth/register` | Zod-validated (name, email, password, role) |
| `Navbar` (`components/shared/navbar.tsx`) → `logoutAction` (`(publicGroup)/_actions/logoutActions.ts`) | POST | `/api/auth/logout` | Clears cookies server-side (best-effort) |
| `proxy.ts` (project root) → `getNewAccessToken` (`service/refreshToken.ts`) | POST | `/api/auth/refresh-token` | Transparent access-token refresh on expiry |
| `getMe()` (`service/getMe.ts`) | GET | `/api/users/me` | Fetches current authenticated user; used in `PublicShell` / `DashboardShell` for role-aware UI |

---

## Properties (Public)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `featuredProperties.tsx` (`(publicGroup)/_components/home/`) → `fetchFeaturedProperties` (`(publicGroup)/_actions/getPropertiesAll.ts`) | GET | `/api/properties?limit=6&sort=-createdAt` | Newest 6 active listings, home page |
| `PublicPropertiesList.tsx` (`(publicGroup)/_components/properties/`) → `fetchAllProperties` (`(publicGroup)/_actions/getPropertiesAll.ts`) | GET | `/api/properties?{city,categoryId,minRent,maxRent,page}` | Browse page, filters via `PropertyFilters.tsx` |
| `properties/[id]/page.tsx` (`(publicGroup)/properties/[id]/`) → `fetchPropertyById` (`(publicGroup)/_actions/fetchPropertyById.ts`) | GET | `/api/properties/:id` | Property details; includes images, category, landlord |
| `heroSearch.tsx` (`(publicGroup)/_components/home/`) | — | *(redirects to `/properties?{query}`)* | No direct API call; builds query params for the browse page |

## Properties (Landlord)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `LandlordPropertiesList.tsx` → `fetchLandlordProperties` (`(dashboardGroup)/_actions/properties/landlord-properties.ts`) | GET | `/api/properties/my-properties` | Auth: LANDLORD |
| `edit/page.tsx` (`landlord-dashboard/properties/[id]/edit/`) → `fetchLandlordPropertyById` (`(dashboardGroup)/_actions/properties/landlord-properties.ts`) | GET | `/api/properties/:id` | Prefills edit form |
| `PropertyForm.tsx` (create) → `createPropertyAction` (`(dashboardGroup)/_actions/properties/propertyAction.ts`) | POST | `/api/properties` | FormData + Zod validated; handles images, amenities, status |
| `PropertyForm.tsx` (edit) → `updatePropertyAction` (`(dashboardGroup)/_actions/properties/propertyAction.ts`) | PATCH | `/api/properties/:id` | Same validation; includes availability `status` toggle |
| `DeletePropertyButton.tsx` → `deletePropertyAction` (`(dashboardGroup)/_actions/properties/propertyAction.ts`) | DELETE | `/api/properties/:id` | AlertDialog confirm before calling |
| `landlord-dashboard/page.tsx` (Overview) | — | *(computed client-side from `my-properties` + `received` requests)* | No dedicated stats endpoint |

## Properties (Admin)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `AdminPropertiesTable.tsx` → `fetchAllPropertiesForAdmin` (`(dashboardGroup)/_actions/properties/admin/adminModeration.ts`) | GET | `/api/properties/admin/all` | Auth: ADMIN; includes inactive listings |
| `admin-dashboard/properties/[id]/page.tsx` | GET | `/api/properties/:id` | Admin single-property view |

---

## Rental Requests (Tenant)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `RequestToRentButton.tsx` (`(dashboardGroup)/_components/rentals/`) → `createRentalRequestAction` (`(dashboardGroup)/_actions/rentals/rentalRequestAction.ts`) | POST | `/api/rentals/:propertyId` | `:propertyId` in URL param, not body |
| `MyRequestsTable.tsx` (`tenant-dashboard/requests`) → `fetchTenantRequests` (`(dashboardGroup)/_actions/rentals/tenantRequests.ts`) | GET | `/api/rentals/my-requests` | Auth: TENANT |
| `pay/page.tsx` (`tenant-dashboard/requests/[id]/pay/`) → `fetchTenantRequestById` (`(dashboardGroup)/_actions/payments/tenantRequests.ts`) | GET | `/api/rentals/:id` | Single request with property details |

## Rental Requests (Landlord)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `RequestsTable.tsx` (`landlord-dashboard/requests`) → `fetchLandlordRequests` (`(dashboardGroup)/_actions/properties/landlord-properties.ts`) | GET | `/api/rentals/received` | Auth: LANDLORD |
| Approve button (`RequestsTable.tsx`) → `approveRequestAction` (`(dashboardGroup)/_actions/properties/requestAction.ts`) | PATCH | `/api/rentals/:id/approve` | Optimistic UI update via `useOptimistic` |
| `RejectRequestButton.tsx` → `rejectRequestAction` (`(dashboardGroup)/_actions/properties/requestAction.ts`) | PATCH | `/api/rentals/:id/reject` | Requires `rejectionReason` in body |

## Rental Requests (Admin)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `AdminRequestsTable.tsx` → `fetchAllRequestsForAdmin` (`(dashboardGroup)/_actions/properties/admin/adminModeration.ts`) | GET | `/api/rentals/admin/all` | Auth: ADMIN |

---

## Payments

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `PayButton.tsx` → `createCheckoutSessionAction` (`(dashboardGroup)/_actions/payments/paymentAction.ts`) | POST | `/api/payments/checkout-session` | Creates Stripe subscription Checkout session, returns `paymentUrl` |
| `payment/success/page.tsx`, `_components/payments/cancel/page.tsx` | — | *(frontend-only pages)* | Reads `rentalRequestId` from query params after Stripe redirect |
| Stripe webhook (backend only) | POST | `/api/payments/webhook` | Confirms payment, sets `RentalRequest.status = ACTIVE` |
| `PaymentHistoryTable.tsx` (`tenant-dashboard/payments`) → `fetchTenantPaymentHistory` (`(dashboardGroup)/_actions/payments/tenantPayments.ts`) | GET | `/api/payments` | Paginated `{ data, meta }`; tenant-scoped |

---

## Reviews

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `ReviewForm.tsx` (`(publicGroup)/_components/reviews/`, rendered at `tenant-dashboard/requests/[id]/review`) → `createReviewAction` (`(publicGroup)/_actions/reviews/reviewAction.ts`) | POST | `/api/reviews` | Requires rental request `status` = ACTIVE/COMPLETED |

---

## User Management (Admin)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `UsersTable.tsx` → `fetchAllUsers` (`(dashboardGroup)/_actions/user/adminUsers.ts`) | GET | `/api/users` | Auth: ADMIN; client-side search + pagination |
| Ban/Unban button (`UsersTable.tsx`) → `updateUserStatusAction` (`(dashboardGroup)/_actions/user/admin/userAction.ts`) | PATCH | `/api/users/:id/status` | Body: `{ activeStatus: "ACTIVE" \| "BLOCKED" }`; admin accounts protected server-side |

---

## Categories

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `PropertyForm.tsx`, `PropertyFilters.tsx`, `heroSearch.tsx` → `fetchCategories` (`(dashboardGroup)/_actions/properties/fetchCategories.ts`) | GET | `/api/categories` | Used in create/edit property forms and browse filters |

---

## Layout / Shell Components

| Component | Purpose |
|---|---|
| `(publicGroup)/_components/PublicShell.tsx` + `PublicShellSkeleton.tsx` | Fetches `getMe()` inside a Suspense boundary; renders `Navbar` for public routes |
| `(dashboardGroup)/_components/dashboard/DashboardShell.tsx` + `DashboardShellSkeleton.tsx` | Fetches `getMe()` inside a Suspense boundary; renders role-based sidebar for dashboard routes |
| `(dashboardGroup)/_config/*SidebarItems.ts` | Per-role sidebar navigation config (tenant, landlord, admin) |

---

## Auth & Middleware Notes

- **`proxy.ts`** (Next.js 16 middleware, project root) enforces route protection and role-based access (`/tenant-dashboard`, `/landlord-dashboard`, `/admin-dashboard`) before any page renders. It also transparently refreshes an expired `accessToken` using the `refreshToken` cookie.
- Server Actions that mutate data (`create*Action`, `update*Action`, `delete*Action`) independently verify authentication via `isAccessTokenExist()` (`service/refreshToken.ts`) — this is the actual authorization boundary, not just `proxy.ts`.
- All authenticated requests pass the access token via the `Cookie` header (`Cookie: accessToken=...`) since the frontend calls the backend server-side (Server Components / Server Actions), not via client-side `fetch`.

## Cache Invalidation

`updateTag(...)` is called after every successful mutation for immediate read-your-own-writes consistency, using these tags:
`landlord-properties`, `properties`, `property-{id}`, `landlord-requests`, `tenant-requests`, `admin-users`, `admin-properties`, `admin-requests`.