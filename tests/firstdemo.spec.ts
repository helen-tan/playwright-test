import { expect, test } from '@playwright/test';

// COMMANDS TO RUN TESTS:
// single file: npx playwright test <filename>
// all files: npx playwright test
// headed(opens browsers, slower, for when writing test cases): npx playwright test --headed <filename>
// headless (faster, for stable test cases): leave out --headless
// see which test cases will be identified for a command: npx playwright test --list / npc playwright test <filename> --list

// should not be a blocking call, so that other processes in other tests can run
// so, we make the lambda asynchronous and await
// playwright will instantiate a new instance of page is created everytime a page is declared here. it will not reuse a page. Fresh instance of browser is created
// So 2 tests can run in parallel. test 1 and 2 will run in their own browsers. the await keyword will not stop other tests from running
test('testing google search page', async ({ page }) => {
    await page.goto('https://www.google.com'); // need to wait for this to come back

    await expect(page).toHaveTitle('Google');
});

test('testing bing search page', async({ page }) => {
    await page.goto('https://www.bing.com');

    await expect(page).toHaveTitle('Search - Microsoft Bing');
});

test('testing tv tropes', async ({ page }) => {
    await page.goto('https://tvtropes.org/');

    await expect(page).toHaveTitle('TV Tropes');
});