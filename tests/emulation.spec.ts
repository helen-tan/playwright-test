import test from "@playwright/test";

test.use({
    viewport: { width: 1600, height: 1200 }
});

test('my test', async({ page }) => {
    await page.goto('https://www.chetanpanchal.com');
});

test.describe('specific viewport block', () => {
    test.use({viewport: { width: 1600, height: 1200 }});

    test('my test', async({ page }) => {
        await page.goto('https://www.chetanpanchal.com');
    });
});