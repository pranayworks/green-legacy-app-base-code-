# Green Legacy Mock Server

This is a small Express + TypeScript mock server used for local development with the Green Legacy React Native app.

Available endpoints:
- POST /api/auth/google -> returns mock user + token
- GET /api/donations -> list donations
- POST /api/donations -> add a donation
- GET /api/stats -> aggregated stats

Run (Windows PowerShell):

```powershell
cd server
npm install
npm run start
```

Notes:
- For Android emulator use `10.0.2.2` instead of `localhost`.
- TODO: Replace mock auth and in-memory store with real DB and OAuth in production.
