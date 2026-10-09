# GoPratle EventHire

A full-stack event requirement platform for posting and reviewing event needs across planners, performers, and crew categories.

This project contains:
- Backend API in `backend/`
- Frontend web app in `frontend/`

## Tech Stack

Backend
- Node.js 18+
- Express.js
- MongoDB + Mongoose
- Zod validation
- CORS + Helmet + Morgan + Express Rate Limit

Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Zustand state management

## Project Structure

```text
eventhire/
├── backend/
│   ├── src/
│   ├── tests/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── README.md
└── .gitignore
```

## Prerequisites

Before running the app locally, make sure you have:
- Node.js 18 or newer
- npm
- MongoDB running locally or a MongoDB Atlas cluster
- Git

## 1) Clone the repository

```bash
git clone <your-github-repo-url>
cd eventhire
```

## 2) Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Update the `.env` file with your valid values:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/automax?retryWrites=true&w=majority
JWT_SECRET=jwtsecretkey
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
CLIENT_URL=http://localhost:3000
ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@automaxengineers.com
ADMIN_PASSWORD=Admin@12345
```

### Seed the admin user

```bash
npm run seed
```

### Start backend

```bash
npm run dev
```

Backend should be available at:

```text
http://localhost:5000/api/v1
```

## 3) Frontend setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file if needed:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Start frontend

```bash
npm run dev
```

Frontend should be available at:

```text
http://localhost:3000
```

If your Next.js app uses another port, check the terminal output and use that port instead.

## 4) API endpoints

Base URL:

```text
http://localhost:5000/api/v1
```

### Health

```http
GET /health
```

### Requirements

```http
GET /requirements
POST /requirements
GET /requirements/:id
GET /requirements/meta/options
GET /requirements/stats
```

## 5) Deployment guide

### Frontend deployment (Vercel)

1. Push this repo to GitHub.
2. Import the `frontend` folder into Vercel.
3. Set environment variable:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url/api/v1
   ```
4. Deploy.

### Backend deployment (Render / Railway / VPS)

1. Deploy the `backend` folder as a Node.js app.
2. Add environment variables:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGO_URI=<your-production-mongodb-uri>
   JWT_SECRET=<strong-secret>
   CORS_ORIGINS=https://your-frontend-domain.com
   ADMIN_NAME=Super Admin
   ADMIN_EMAIL=admin@yourdomain.com
   ADMIN_PASSWORD=<secure-admin-password>
   ```
3. Start with:
   ```bash
   npm install
   npm start
   ```

## 6) Database notes

This project assumes MongoDB is available. You can use either:
- local MongoDB instance
- MongoDB Atlas cluster

For MongoDB Atlas, use a connection string like:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/automax?retryWrites=true&w=majority
```

## 7) Admin credentials

The app reads admin values from environment variables:

```env
ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@automaxengineers.com
ADMIN_PASSWORD=Admin@12345
```

A seed script is available to insert or update the admin user:

```bash
cd backend
npm run seed
```

## 8) Useful commands

```bash
# backend
dcd backend
npm install
npm run seed
npm run dev
npm test

# frontend
cd frontend
npm install
npm run dev
npm run build
```

## 9) Notes

- This project is intended for local development and production deployment with a MongoDB-backed API.
- For production, make sure all secret values are stored securely and never committed to Git.
- If you use Vercel or another platform, set environment variables from the dashboard instead of hardcoding them into source files.

## 10) License

This project is for educational and project/demo use.

## 11) GitHub push checklist

Before pushing to GitHub:

```bash
git status
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin <your-github-url>
git push -u origin main
```

## Contact

Add your project maintainer or owner details here if needed.
