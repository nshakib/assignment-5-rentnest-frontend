# API Integration — RentNest Frontend

This document maps each frontend component/page to the backend API endpoint(s) it consumes.

**Backend base URL:** set via `NEXT_PUBLIC_BACKEND_API_URL` in `.env.local`

---

## Authentication

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `RegisterForm` (`/auth/register`) → `registerAction` | POST | `/api/auth/register` | Zod-validated (name, email, password, role) |
| `LoginForm` (`/auth/login`) → `loginAction` | POST | `/api/auth/login` | Sets `accessToken` / `refreshToken` cookies |
| `Navbar` → `logoutAction` | POST | `/api/auth/logout` | Clears cookies server-side (best-effort) |
| `proxy.ts` (middleware) → `getNewAccessToken` | POST | `/api/auth/refresh-token` | Transparent token refresh on expiry |
| `getMe()` service | GET | `/api/users/me` | Fetches current authenticated user; used in layouts for role-aware UI |

---

## Properties (Public)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `FeaturedProperties` (home page) → `fetchFeaturedProperties` | GET | `/api/properties?limit=6&sort=-createdAt` | Newest 6 active listings |
| `/properties` browse page → `fetchAllProperties` | GET | `/api/properties?{filters}` | Supports location, price range, pagination via query params |
| `/properties/[id]` details page → `fetchPropertyById` | GET | `/api/properties/:id` | Includes images, category, landlord |

## Properties (Landlord)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `LandlordPropertiesList` → `fetchLandlordProperties` | GET | `/api/properties/my-properties` | Auth: LANDLORD |
| `PropertyForm` (create) → `createPropertyAction` | POST | `/api/properties` | Zod + FormData validated; handles images, amenities |
| `PropertyForm` (edit) → `updatePropertyAction` | PATCH | `/api/properties/:id` | Same validation; includes availability `status` toggle |
| `DeletePropertyButton` → `deletePropertyAction` | DELETE | `/api/properties/:id` | Confirm dialog before calling |
| Landlord Overview stats | — | *(computed client-side from `my-properties` + `received` requests)* | No dedicated stats endpoint |

## Properties (Admin)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `AdminPropertiesTable` → `fetchAllPropertiesForAdmin` | GET | `/api/properties/admin/all` | Auth: ADMIN; includes inactive listings |

---

## Rental Requests (Tenant)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `RequestToRentButton` → `createRentalRequestAction` | POST | `/api/rentals/:propertyId` | `:propertyId` in URL, not body |
| `MyRequestsTable` (`/tenant-dashboard/requests`) → `fetchTenantRequests` | GET | `/api/rentals/my-requests` | Auth: TENANT |
| Pay page → `fetchTenantRequestById` | GET | `/api/rentals/:id` | Single request with property details |

## Rental Requests (Landlord)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `RequestsTable` (`/landlord-dashboard/requests`) → `fetchLandlordRequests` | GET | `/api/rentals/received` | Auth: LANDLORD |
| Approve button → `approveRequestAction` | PATCH | `/api/rentals/:id/approve` | Optimistic UI update via `useOptimistic` |
| `RejectRequestButton` → `rejectRequestAction` | PATCH | `/api/rentals/:id/reject` | Requires `rejectionReason` in body |

## Rental Requests (Admin)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `AdminRequestsTable` → `fetchAllRequestsForAdmin` | GET | `/api/rentals/admin/all` | Auth: ADMIN |

---

## Payments

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `PayButton` → `createCheckoutSessionAction` | POST | `/api/payments/checkout-session` | Creates Stripe subscription Checkout session, returns `paymentUrl` |
| Stripe → `/payment/success`, `/payment/cancel` | — | *(frontend-only pages)* | Reads `rentalRequestId` from query params |
| Stripe webhook (backend only) | POST | `/api/payments/webhook` | Confirms payment, sets `RentalRequest.status = ACTIVE` |
| `PaymentHistoryTable` (`/tenant-dashboard/payments`) → `fetchTenantPaymentHistory` | GET | `/api/payments` | Paginated `{ data, meta }`; tenant-scoped |

---

## Reviews

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `ReviewForm` (`/tenant-dashboard/requests/[id]/review`) → `createReviewAction` | POST | `/api/reviews` | Requires `status` = ACTIVE/COMPLETED on the rental request |

---

## User Management (Admin)

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `UsersTable` (`/admin-dashboard/users`) → `fetchAllUsers` | GET | `/api/users` | Auth: ADMIN; client-side search + pagination |
| Ban/Unban button → `updateUserStatusAction` | PATCH | `/api/users/:id/status` | Body: `{ activeStatus: "ACTIVE" \| "BLOCKED" }`; admin accounts protected server-side |

---

## Categories

| Frontend Component/Action | Method | Endpoint | Notes |
|---|---|---|---|
| `PropertyForm` category dropdown → `fetchCategories` | GET | `/api/categories` | Used in create/edit property forms |

---

## Auth & Middleware Notes

- **`proxy.ts`** (Next.js 16 middleware) enforces route protection and role-based access (`/tenant-dashboard`, `/landlord-dashboard`, `/admin-dashboard`) before any page renders. It also transparently refreshes an expired `accessToken` using the `refreshToken` cookie.
- Server Actions that mutate data (`create*Action`, `update*Action`, `delete*Action`) independently verify authentication via `isAccessTokenExist()` — this is the actual authorization boundary, not just `proxy.ts`.
- All authenticated requests pass the access token via the `Cookie` header (`Cookie: accessToken=...`) since the frontend calls the backend server-side (Server Components / Server Actions), not via client-side `fetch`.

## Cache Invalidation

- `updateTag(...)` is called after every successful mutation to immediately reflect changes (read-your-own-writes) for tags: `landlord-properties`, `properties`, `property-{id}`, `landlord-requests`, `tenant-requests`, `admin-users`, `admin-properties`, `admin-requests`.