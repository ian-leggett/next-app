import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('accessibility', () => {
  test('home page with no to-dos has no violations', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'To-do' })).toBeVisible()

    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })

  test('home page with a to-do has no violations', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Add a task...').fill('Buy milk')
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText('Buy milk')).toBeVisible()

    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })
})
