import { test, expect } from '@playwright/test'

test('home page shows the to-do app', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'To-do' })).toBeVisible()
})
