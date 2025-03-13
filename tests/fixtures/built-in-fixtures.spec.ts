import test, { expect } from "@playwright/test";

test('All built-in fixture example', async ({
    page, browser, browserName, context, request, baseURL, headless, isMobile
}, testInfo) => {

    console.log(`Browser Name: ${browserName}`);
    console.log(`Running on headless mode: ${headless}`);
    console.log(`Is Mobile Emulation: ${isMobile}`);
    console.log(`Base URL: ${baseURL ?? 'Not Set'}`);

    console.log(`Test File: ${testInfo.file}`);
    console.log(`Test Title: ${testInfo.title}`);
    console.log(`Test Retries: ${testInfo.retry}`);

    // Browser and Context
    console.log(`Browser Version: ${browser.version()}`);
    console.log(`Context Cookies: `, await context.cookies());

    // Page Navigation
    await page.goto(baseURL ?? 'https://example.com');
    expect(await page.title()).toBe('Example Domain');

    // API Request
    const response = await request.get('https://api.github.com');
    console.log(`API Response Status: ${response.status()}`);
});