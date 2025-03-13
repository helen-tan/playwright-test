import test, { expect } from "@playwright/test";
import fs from 'fs';

test('Download a file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');

    // wait for download to start
    const downloadPromise = page.waitForEvent('download');

    // Click on the file link
    const file = page.locator('a[href^="download/"]').getByText('test.txt', { exact: true }).first();
    const fileName = await file.innerText();
    await file.click();

    // Wait for the download to complete
    const download = await downloadPromise;
    const filePath = `downloads/${fileName}`;

    // Save the file locally
    await download.saveAs(filePath);

    console.log(`File downloaded: ${filePath}`);

    // Ensure the file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
});