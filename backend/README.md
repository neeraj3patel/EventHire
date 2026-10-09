# GoPratle Backend – Requirement Posting API

Node.js + Express + MongoDB (Mongoose) API for the multi-step requirement posting flow.

## Run
```bash
cp .env.example .env     # set MONGO_URI
npm install
npm run dev              # http://localhost:5000/api/v1/health
npm test
```

## Structure
```
src/
  config/        env validation, DB connection
  constants/     enums shared by models + validation
  models/        Mongoose base model + planner/performer/crew discriminators
  validations/   Zod schemas (one source of truth for request shape)
  controllers/   HTTP layer only
  services/      business/data logic
  routes/        route definitions
  middlewares/   validate, errorHandler, notFound, rateLimiter
  utils/         ApiError, apiResponse, asyncHandler, logger
tests/           supertest + mongodb-memory-server
```

## Endpoints (`/api/v1`)
| Method | Path | Purpose |
|---|---|---|
| GET | /health | Health + DB status |
| GET | /requirements/meta/options | Enums for building the form |
| POST | /requirements | Step 4 – submit full requirement |
| GET | /requirements?category=&eventType=&page=&limit= | List (paginated) |
| GET | /requirements/stats | Counts per category |
| GET | /requirements/:id | Single requirement |

## Field mapping per step
| Category | Step 2 | Step 3 |
|---|---|---|
| planner | services, planningStage, guestCount | budgetMin, budgetMax, notes |
| performer | performerType, genres, performersNeeded | durationMinutes, budgetPerPerformer, equipmentProvided, languages, notes |
| crew | roles[{role,count}], experienceLevel | shiftHours, numberOfDays, budgetPerDay, accommodationProvided, transportProvided, notes |

## Example
```json
POST /api/v1/requirements
{
  "category": "performer",
  "eventName": "Sangeet Night",
  "eventType": "wedding",
  "dateType": "range",
  "startDate": "2026-12-10",
  "endDate": "2026-12-11",
  "location": "Jaipur",
  "venue": "Rambagh Palace",
  "details": {
    "performerType": "singer",
    "genres": ["bollywood"],
    "performersNeeded": 2,
    "durationMinutes": 90,
    "budgetPerPerformer": 40000
  }
}
```

## Design decisions
- Frontend wizard keeps state across steps; backend takes one validated submission (no half-saved drafts).
- Single `requirements` collection with Mongoose discriminators on `category`: one query for all, strict per-category schema.
- Zod discriminated union validates `details` against the chosen category; unknown keys are stripped.
- Dates: single-day events store `endDate = startDate`.

## Known limitations / next steps
No auth, no drafts, no update/delete, UTC-based date check, in-memory rate limiting. Next: JWT auth, drafts, TypeScript, OpenAPI docs.
