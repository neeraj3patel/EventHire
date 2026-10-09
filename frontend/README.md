# GoPratle Frontend – Requirement Posting Flow

Next.js (App Router) + TypeScript + Tailwind CSS. Talks to the Express/MongoDB backend.

## Run locally
```bash
cp .env.example .env.local     # NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
npm install
npm run dev                    # http://localhost:3000
```
Backend must be running, and its `CORS_ORIGINS` must include `http://localhost:3000`.

## Flow
1. **Event basics**: name, type, single date or date range, location, optional venue, category (Planner / Performer / Crew)
2. **Category step A** and 3. **Category step B**: fields change with the chosen category
4. **Review & submit**: summary with edit links, then `POST /requirements`; success screen shows the saved category

Also: `/requirements` lists saved requirements with category tabs and pagination (server component).

## Structure
```
src/
  app/                 routes: /, /post-requirement, /requirements (+ loading, error, not-found)
  components/
    ui/                Button, Input/Select/Textarea, Checkbox, Field, Alert, Badge
    layout/            Header
    wizard/            WizardShell, Stepper, StepForm, SuccessScreen
      steps/           BasicsStep, ReviewStep, planner/, performer/, crew/
    requirements/      RequirementCard, CategoryTabs, Pagination
  lib/
    api/               fetch client + requirement endpoints
    validations/       zod schemas per step (basics, planner, performer, crew)
    constants.ts       enums, labels, category metadata
    payload.ts         form state (strings) -> typed API payload
    format.ts          display helpers shared by review + cards
  store/               zustand wizard store (persisted to sessionStorage)
  hooks/               useCategoryStepForm, useHydrated
  types/               API / domain types
  config/              env
```

## Key decisions
- **One store, per-category data**: switching category in step 1 never loses what was typed for another category.
- **Persisted wizard state** (sessionStorage): refresh keeps progress; cleared on submit.
- **Schemas per step** (react-hook-form + zod): each step validates on its own; `payload.ts` re-validates everything before submit.
- **Form values are strings**, converted to numbers only when building the payload (avoids NaN/coerce edge cases).
- **Same enums as backend** (`constants.ts`); the backend also exposes `GET /requirements/meta/options` if you prefer fetching them.
- System fonts (no external font fetch at build time).

## Deploy (Vercel)
1. Deploy backend (Render/Railway) with MongoDB Atlas; set `CORS_ORIGINS` to your Vercel URL.
2. Import the frontend repo in Vercel, add env var `NEXT_PUBLIC_API_URL=https://<backend-host>/api/v1`, deploy.

## Limitations / next steps
No auth, no draft saving on server, no unit/E2E tests yet (next: Vitest for schemas + Playwright for the flow), no i18n.
