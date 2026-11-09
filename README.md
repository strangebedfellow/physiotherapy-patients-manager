## General info
App for physiotherapists to manage their patients' visits.
The app uses Firebase (Auth + Realtime Database) as its backend and the Google Drive API for uploading/viewing patient documents. The UI is built with Material UI, with layout and custom styling done in Tailwind CSS.

## Technologies
* Vite 8 + React 19 + TypeScript 7
* Material UI 9 (+ MUI X Date Pickers) and Tailwind CSS 4
* Firebase 13 (modular API)
* Google Identity Services + Google Drive API v3

## Setup
Requires Node.js 24.12 or newer (Firebase 13's minimum).

```
$ npm install
$ cp .env.example .env   # fill in the Firebase config and (optionally) the Google OAuth client ID
$ npm run dev            # http://localhost:3000
```

The dev server runs on port 3000 because that origin has to be listed under "Authorized JavaScript origins" for the Google OAuth client.

## Scripts
| Command | Description |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type check + production build into `build/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | oxlint |
| `npm test` | Unit tests (Vitest) |
