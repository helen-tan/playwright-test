import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/); // More loose
  // await expect(page).toHaveTitle("Fast and reliable end -- to -- end testing for modern web apps | Plauywright"); // Strict assertion

  // Note:
  // Assertion with hardcoded string (strict) vs a regex (more loose)
  // Strict assertions will increase the cost of maintenance
  // Minor change to your code will require you to update your test script.
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
