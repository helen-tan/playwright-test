import test, { expect } from "@playwright/test";

// Written by me
test('locate data 1', async ({ page }) => {
    await page.goto('https://demo.chetanpanchal.com/');
    await page.locator('#loadContent').click();
    // locate data1
    const dataitem1 = page.locator('#dataPartialContent > ol > li:nth-child(1)');
    await expect(dataitem1).toHaveText('Data1');
});

// Written by codegen
test('locate data 1 by codegen', async ({ page }) => {
    await page.goto('https://demo.chetanpanchal.com/');
    await page.getByRole('button', { name: 'Load Content', exact: true }).click();
    await expect(page.locator('#dataPartialContent')).toContainText('Data1');
});
