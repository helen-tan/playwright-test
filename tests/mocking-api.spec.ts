import { test, expect } from "@playwright/test";

test.use({ launchOptions: { slowMo: 500} });

test('mocks a fruit and doesnt call api', async ({ page }) => {
    // Before navigation, the following line will intercept any network request made to a URL that matches */**/api/v1/fruits
    // the wildcard */**/ ensures it matches any base URL domain
    await page.route('*/**/api/v1/fruits', async route => {
        // Mock the API response: Instead of letting the browser make a real request, playwright intercepts it and returns a mocked response
        const json = [{ name: 'Berries', id: 21 }]; // the mocked response will contain this object
        await route.fulfill({ json });
    });

    // Actually navigate to the page
    await page.goto('https://demo.playwright.dev/api-mocking/');

    // Cehck that the mocked data is visible
    await expect(page.getByText('Berries')).toBeVisible();
});

test('gets the json from api and adds a new fruit', async ({ page }) => {
    // Before navigation, the following line will intercept any network request made to a URL that matches */**/api/v1/fruits
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch(); // fetch the original and actual api response
        const json = await response.json(); // convert response to json format

        json.push({ name: 'Berries', id: 21 }); // modify the response data, by adding a new fruit
        // Fulfill using the original response, while pathcing the response body with the given json object
        await route.fulfill({ response, json }); // return the modified response to the page
    });

    // Navigate to the page
    await page.goto('https://demo.playwright.dev/api-mocking/');

    // Assert that the new fruit is visible
    await expect(page.getByText('Berries', { exact: true })).toBeVisible();
});

test('mock empty response', async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        await route.fulfill({ json: [] });
    });
});

test('mock 500 response', async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        await route.fulfill({ status: 500 });
    });
})
