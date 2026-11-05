// Smoke check against a deployed preview. Exits non-zero on any failure.
// Env: PREVIEW_URL (required), VERCEL_PROTECTION_BYPASS (optional, for protected previews).

const base = process.env.PREVIEW_URL;
const bypass = process.env.VERCEL_PROTECTION_BYPASS;

if (!base) {
  console.error("smoke: PREVIEW_URL is not set");
  process.exit(1);
}

const url = new URL("/", base);
const headers = bypass ? { "x-vercel-protection-bypass": bypass } : {};

try {
  const res = await fetch(url, {
    headers,
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
  });
  const body = await res.text();

  if (res.status !== 200) {
    console.error(`smoke: GET ${url} returned ${res.status}`);
    process.exit(1);
  }
  if (!body.includes("<html")) {
    console.error(`smoke: GET ${url} did not return an HTML document`);
    process.exit(1);
  }
  console.log(`smoke: GET ${url} -> 200 OK`);
} catch (err) {
  console.error(`smoke: GET ${url} failed: ${err.message}`);
  process.exit(1);
}
