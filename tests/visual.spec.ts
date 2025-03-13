import { test, expect } from "@playwright/test";

// visually compare sceenshots

test.describe('visual comparison test', () => {
    test('compare landing page with golden screenshot', async ({ page }) => {
        await page.goto('https://playwright.dev');
        await expect(page.locator('.heroTitle_ohkl')).toHaveScreenshot('landing.png', { maxDiffPixels: 5 });
    });
});
