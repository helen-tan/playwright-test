import test, { expect } from "@playwright/test";

test('Upload a file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    // Select the file input element
    const fileInput = page.locator('input[type="file"]').first();

    // Set the file to upload (ensure file exists in the given path)
    await fileInput.setInputFiles('downloads/test.txt');

    // Click upload button
    await page.click('input[type="submit"]');

    // Verify upload success
    await expect(page.locator('#uploaded-files')).toHaveText('test.txt');
});