# SubTrack Frontend

React + Vite + Tailwind CSS subscription tracker UI.

## Run

```bash
npm install
npm run dev
```

The current authentication and subscription data are demo-only so the entire UI can be developed before the Express/MongoDB backend.

## Next backend integration

- Replace AuthContext demo login/register with Axios calls.
- Add `GET /api/auth/me`.
- Add protected subscription CRUD endpoints.
- Keep `withCredentials: true` for httpOnly cookie authentication.
