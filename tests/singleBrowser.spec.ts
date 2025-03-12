import test, { BrowserContext, expect, Page } from "@playwright/test";

test.describe('1 page multiple test', () => {
    let page: Page;
    let context: BrowserContext;

    test.beforeAll(async({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage()
        await page.goto('https://demo.chetanpanchal.com');
    });

    test.afterAll(async({ browser }) => {
        await page.close();
        await context.close();
    });

    test('header 1 test', async () => {
        const name = await page.innerText('h1');
        await expect(name).toContain('Display');;
    });

    test('header 2 test', async () => {
        const name = await page.innerText('h2');
        await expect(name).toContain('2nd level');
    });
});