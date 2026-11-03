# #2: Choose Light or Dark Theme preference and persist it

Column: QA Review

## What to build

A visitor can choose **Light** or **Dark** with a Theme control in the top-right corner, and the **Theme preference** sticks across reloads with no flash of the wrong theme. See `GLOSSARY.md` for the terms and `docs/adr/0001-theme-preference-cookie-and-data-theme.md` for the decision.

- The choice is stored in a `theme` cookie (one-year expiry, `SameSite=Lax`, readable by script) and applied as `data-theme` on `<html>` by an inline script in `<head>`, so first paint is correct.
- The root layout must NOT read `cookies()`: `cacheComponents` is on and that would block prerendering of every route.
- The `dark:` variant and the colour variables follow `data-theme="dark"`. When there is no `data-theme`, the existing `prefers-color-scheme` media query still applies, so a visitor who never touches the control sees today's behaviour.
- The Theme control sits inside a landmark so the axe `region` rule passes.
- e2e tests must wait for hydration before interacting with the control (an earlier attempt raced hydration and flaked).

## Acceptance criteria

- [ ] Choosing Dark sets `data-theme="dark"`, and it survives a reload with no flash of the light theme
- [ ] Choosing Light under a dark OS shows the light theme
- [ ] Choosing Dark under a light OS shows the dark theme
- [ ] With no choice made, the page follows the OS exactly as it does today
- [ ] The existing a11y e2e specs still pass
- [ ] e2e tests cover the above, using the highest seam (Playwright against the running page)

## Blocked by

None (can start immediately)

## History

| Date | Transition | Labels | Note |
| --- | --- | --- | --- |
| 2026-11-03 | Ready → In progress |  | Claimed by factory-run. - Branch: factory/2 - Worktree: /Users/ianleggett/.factory/ian-leggett-next-app/worktrees/2 - Port: 4102 |
| 2026-11-03 | In progress → QA Review |  | Draft PR: https://github.com/ian-leggett/next-app/pull/5 I built the Light/Dark theme control and opened draft PR #5 (`Closes #2`). I couldn't confirm the new e2e specs pass, and the new code hasn't been typechecked or unit-tested. `npm run lint` passes. **What it does** - **Control:** a Light/Dark button group in a `<header>` landmark, top-right (`src/app/ui/theme-control.tsx`). It sets `data-theme` on `<html>` and writes the `theme` cookie (one year, `SameSite=Lax`, readable by script). - **No flash:** an inline `<head>` script in `src/app/layout.tsx` copies the cookie to `data-theme` before first paint. The layout doesn't read `cookies()`. - **CSS:** `src/app/globals.css` makes the `dark:` variant and the colour variables follow `data-theme="dark"`. With no `data-theme`, the `prefers-color-scheme` media query still applies. - **Tests:** `e2e/theme.spec.ts` covers each acceptance criterion. It waits for a `data-hydrated` marker on the control before clicking. - **Playwright config:** I made the port configurable with `PORT` (default 3000), because 3000 was taken. **What isn't verified** - **Playwright run:** it hit a stale server on port 3000 that doesn't have this change. The 4 existing specs passed there. The 6 new theme specs failed, because that server didn't render the control. - **Rerun denied:** the rerun on port 4102 was denied, as were `tsc` and vitest. The a11y check on the new header is therefore unconfirmed. - **Missing files:** `docs/factory/config.md`, `GLOSSARY.md` and the ADR weren't in the worktree. I worked from the ticket text alone. **For QA** - Run `PORT=4102 npm run test:e2e`, plus `npx tsc --noEmit` and `npx vitest run`. - Check the `dark:` variant on the todo UI in both OS schemes, since I never saw it rendered. |
