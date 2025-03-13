import test, { expect } from "@playwright/test";

test.use({ locale: 'fr-FR', launchOptions: { slowMo: 500, args: ['--start-maximized'] } });

test('should inherit use options on context when using built-in browser fixture', async({ browser }) => {
    const context = await browser.newContext({
        userAgent: "Custom",
        viewport: { height: 300, width: 300 }
    });
    const page = await context.newPage();
    await page.goto('https://google.com');

    expect(await page.evaluate(() => navigator.userAgent)).toBe('Custom');
    expect(await page.evaluate(() => window.innerWidth)).toBe(300);

    await context.close();
});

test.describe('German language', () => {
    test.use({
        locale: 'de-DE',
        geolocation: { longitude: 48.890221, latitude: 12.492348 },
        permissions: ['geolocation'],
        colorScheme: 'dark'
    });

    test('example german', async ({ page, context }) => {
        await context.setGeolocation({ longitude: 48.858455, latitude: 21.294474 });
        await page.goto('https://maps.google.com');
        await expect(page).toHaveTitle('Google Maps');
    });
})