import { test, expect, type Page } from '@playwright/test'

const BG_LIGHT = 'rgb(255, 255, 255)'
const BG_DARK = 'rgb(10, 10, 10)'

async function gotoHydrated(page: Page) {
  await page.goto('/')
  await expect(page.locator('[data-hydrated="true"]')).toBeVisible()
}

function bodyBackground(page: Page) {
  return page.evaluate(() => getComputedStyle(document.body).backgroundColor)
}

test.describe('theme preference', () => {
  test('choosing Dark sets data-theme and survives a reload without a flash', async ({
    page,
  }) => {
    await gotoHydrated(page)
    await page.getByRole('button', { name: 'Dark' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    // Record the theme at the first moment a document exists after reload.
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        ;(window as unknown as { __themeAtParse: string | null }).__themeAtParse =
          document.documentElement.getAttribute('data-theme')
      })
    })
    await page.reload()
    const atParse = await page.evaluate(
      () => (window as unknown as { __themeAtParse: string | null }).__themeAtParse,
    )
    expect(atParse).toBe('dark')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    expect(await bodyBackground(page)).toBe(BG_DARK)
  })

  test('stores a one-year, Lax, script-readable theme cookie', async ({
    page,
    context,
  }) => {
    await gotoHydrated(page)
    await page.getByRole('button', { name: 'Dark' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    const cookie = (await context.cookies()).find((c) => c.name === 'theme')
    expect(cookie?.value).toBe('dark')
    expect(cookie?.sameSite).toBe('Lax')
    expect(cookie?.httpOnly).toBe(false)
    const secondsLeft = (cookie?.expires ?? 0) - Date.now() / 1000
    expect(secondsLeft).toBeGreaterThan(60 * 60 * 24 * 364)
  })

  test.describe('under a dark OS', () => {
    test.use({ colorScheme: 'dark' })

    test('with no choice, follows the OS', async ({ page }) => {
      await gotoHydrated(page)
      await expect(page.locator('html')).not.toHaveAttribute('data-theme')
      expect(await bodyBackground(page)).toBe(BG_DARK)
    })

    test('choosing Light shows the light theme', async ({ page }) => {
      await gotoHydrated(page)
      await page.getByRole('button', { name: 'Light' }).click()
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
      expect(await bodyBackground(page)).toBe(BG_LIGHT)
    })
  })

  test.describe('under a light OS', () => {
    test.use({ colorScheme: 'light' })

    test('with no choice, follows the OS', async ({ page }) => {
      await gotoHydrated(page)
      await expect(page.locator('html')).not.toHaveAttribute('data-theme')
      expect(await bodyBackground(page)).toBe(BG_LIGHT)
    })

    test('choosing Dark shows the dark theme', async ({ page }) => {
      await gotoHydrated(page)
      await page.getByRole('button', { name: 'Dark' }).click()
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
      expect(await bodyBackground(page)).toBe(BG_DARK)
    })
  })
})
