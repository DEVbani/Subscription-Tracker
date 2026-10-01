# SubTrack Backend

Express + MongoDB/Mongoose API for the Subscription Tracker.

## 1. Install

```bash
npm install
```

## 2. Environment

Copy `.env.example` to `.env` and replace both JWT secrets with long random values.

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/subscription_tracker
CLIENT_URL=http://localhost:5173
```

Make sure MongoDB is running.

## 3. Run

```bash
npm run dev
```

API:

```text
http://localhost:5000
```

Health check:

```text
GET /api/health
```

## Authentication

The API uses:

- short-lived access JWT in an httpOnly cookie
- rotating refresh JWT in an httpOnly cookie
- MongoDB session records containing a SHA-256 hash of the refresh token
- bcrypt password hashing
- CORS credentials
- Helmet
- auth rate limiting

The frontend should send Axios requests with:

```js
withCredentials: true
```

## Auth endpoints

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/refresh
POST /api/auth/logout
```

## Subscription endpoints

```text
GET    /api/subscriptions
POST   /api/subscriptions
GET    /api/subscriptions/:id
PATCH  /api/subscriptions/:id
DELETE /api/subscriptions/:id
```

Optional list filters:

```text
GET /api/subscriptions?category=Music
GET /api/subscriptions?status=active
GET /api/subscriptions?search=netflix
```

## Next step

Connect the existing React frontend's `AuthContext` to these endpoints and replace the demo subscription data with API calls.
