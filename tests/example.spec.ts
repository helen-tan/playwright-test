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
  // Better to use getByRole to locate elements than getById or class. Better to use user facing attributes, as there is less chance of it being changed.
  // id, class - technical, not user facing. Dev can change this anytime at their whims, and locator in the script has to be updated
  // getByRole, getByLabel is more implicit. Not affected by dev's changes in id, class
  // Smth like 'Get Started' text is directly visible to the end user and more unlikely to be easily changed. Needs PO approval usually
  // Give higher priority to user facing locators, instead of technical locators like id and class

  // let getStartedButton = page.getByRole('link', { name: 'Get started' }); // no need to await
  // await getStartedButton.click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  // instead of h1, h2, h3. 'heading' is more flexible. 
  // If a css selector using h1, h2, h3 is used, if the header is changed one day, maintenance for the script will be required
});
