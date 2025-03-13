import test from "@playwright/test";

test.use({ launchOptions: { slowMo: 500} });

// if you have frames(obselete) or iframes, need to use page.frameLocator before you can use the normal locators

test('test', async ({ page }) => {
    await page.goto('https://demo.chetanpanchal.com/Frames.html');

    await page.frameLocator('frame[name="frameOne"]').getByRole('textbox').click();
    await page.frameLocator('frame[name="frameOne"]').getByRole('textbox').press('Control+a');
    await page.frameLocator('frame[name="frameOne"]').getByRole('textbox').fill('Helen');

    await page.frameLocator('frame[name="frameTwo"]').getByRole('textbox').click();
    await page.frameLocator('frame[name="frameTwo"]').getByRole('textbox').press('Control+a')
    await page.frameLocator('frame[name="frameTwo"]').getByRole('textbox').fill('Tan');
});