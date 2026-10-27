# next-app

A deliberately simple to-do app built with [Next.js](https://nextjs.org). It exists as a boilerplate for testing AI tooling, not as a real product.

You can add, complete and delete tasks. State lives in memory only, so a page refresh clears the list.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                                 |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Start the dev server                        |
| `npm run build`    | Create a production build                   |
| `npm start`        | Serve the production build                  |
| `npm run lint`     | Run ESLint                                  |
| `npm test`         | Run unit tests with Vitest (watch mode)     |
| `npm run test:e2e` | Run Playwright end-to-end and a11y tests    |

Before running the e2e tests for the first time, install the browser with `npx playwright install chromium`.

## Project layout

- `src/app/page.tsx`: the home page
- `src/app/ui/todo-list.tsx`: the to-do list component
- `src/app/**/*.test.tsx`: unit tests (Vitest and Testing Library)
- `e2e/`: Playwright tests, including axe accessibility checks

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs lint, type checking, unit tests and the Playwright suite on every pull request and push to `main`.
