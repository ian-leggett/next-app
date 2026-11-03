# Theme preference lives in a cookie and a `data-theme` attribute

Light and Dark are stored in a `theme` cookie and applied as `data-theme` on `<html>` by an inline `<head>` script, so there is no flash on first paint. System means no cookie and no attribute, and CSS resolves it with `prefers-color-scheme` scoped to `:root:not([data-theme])`, so the media query deliberately stays.

We did not read the cookie with `cookies()` in the root layout, because with `cacheComponents` that blocks prerendering of every route. We did not use `localStorage`, so the cookie remains readable by the server if that is ever needed. The server cannot know the OS appearance, so System can never be resolved at render time.
