import { defineConfig, devices } from '@playwright/test'

const port = process.env.PORT ?? '3000'
// BASE_URL points the suite at an already-deployed preview (no local server)
const remoteURL = process.env.BASE_URL
const baseURL = remoteURL ?? `http://localhost:${port}`
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    extraHTTPHeaders: bypassSecret
      ? { 'x-vercel-protection-bypass': bypassSecret }
      : undefined,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: remoteURL
    ? undefined
    : {
        // CI runs against the production build for speed and fidelity
        command: process.env.CI ? 'npm run start' : 'npm run dev',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        env: { PORT: port },
      },
})
