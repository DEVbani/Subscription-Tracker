# Subscription Tracker

A full-stack subscription management app for tracking recurring services, monitoring upcoming renewals, and keeping an eye on monthly spending.

This project is split into a backend API and a React frontend, with the app logic kept separate for easier development and deployment.

## Features

- User registration and login with secure JWT-based authentication
- Create, view, update, and delete subscriptions
- Track subscription costs, billing cycles, and renewal dates
- Protected dashboard routes for authenticated users only
- Subscription overview pages and details views
- Calendar and analytics pages for usage insights
- Refresh-token flow and cookie-based auth handling

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB via Mongoose
- JWT authentication
- bcrypt for password hashing
- Helmet, CORS, rate limiting, and validation middleware

### Frontend
- React
- Vite
- React Router
- Axios for API calls
- Tailwind CSS for styling

## Project Structure

```text
subscription_tracker/
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env (create locally)
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── .env (create locally)
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ installed
- npm installed
- MongoDB running locally or a MongoDB connection string available

## Backend Setup

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` folder with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/subscription-tracker
CLIENT_URL=http://localhost:5173
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

4. Start the backend server:

```bash
npm run dev
```

The API should run at:

```text
http://localhost:5000
```

## Frontend Setup

1. Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` folder (or copy from `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the React app:

```bash
npm run dev
```

The frontend should run at:

```text
http://localhost:5173
```

## Running the App Together

Start both servers:

- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`

Then open:

```text
http://localhost:5173
```

## API Overview

### Auth Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user
- `GET /api/auth/me` - Fetch current authenticated user
- `POST /api/auth/refresh` - Refresh the access token
- `POST /api/auth/logout` - Log out the user

### Subscription Routes

- `GET /api/subscriptions` - Get all subscriptions for the logged-in user
- `POST /api/subscriptions` - Create a subscription
- `GET /api/subscriptions/:id` - Get a specific subscription
- `PATCH /api/subscriptions/:id` - Update a subscription
- `DELETE /api/subscriptions/:id` - Delete a subscription

## Notes

- The frontend uses cookie-based authentication with the backend API.
- The backend enforces CORS using the `CLIENT_URL` env variable.
- The app is designed to support recurring subscription tracking with a clean dashboard and user-specific data.

## License

This project is currently for learning and personal project use.
