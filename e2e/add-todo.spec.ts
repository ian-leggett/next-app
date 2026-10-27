import { test, expect } from '@playwright/test'

test('adds a new to-do', async ({ page }) => {
  await page.goto('/')

  const input = page.getByPlaceholder('Add a task...')
  await input.fill('Buy milk')
  await page.getByRole('button', { name: 'Add' }).click()

  await expect(page.getByRole('listitem')).toHaveCount(1)
  await expect(page.getByText('Buy milk')).toBeVisible()
  await expect(page.getByRole('checkbox')).not.toBeChecked()
  await expect(input).toHaveValue('')
})
