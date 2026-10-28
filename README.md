# UniPay

A Brazilian Portuguese banking interface prototype built with React, TypeScript and Vite.

## Start the app

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Project structure

- `src/pages/` contains the login, registration, home and PIX pages.
- `src/components/` contains shared layout, navigation, balance, statement and transaction components.
- `src/api.ts` contains the local fake API. Replace the marked methods with backend requests when an API is available.

Account registration uses the email address as the demo PIX key. UI controls have descriptive HTML `id` attributes for browser inspection and future automation.
