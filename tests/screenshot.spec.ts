import test from "@playwright/test";

test('screenshot simple', async ({ page }) => {
    await page.goto('https://google.com');
    
    let searchBox = page.getByLabel('Search', { exact: true });
    let btn = page.getByText('Google Search', { exact: true });

    // Take screenshots, and put the screenshot into the specified path
    await page.screenshot({ path: 'screenshots/screenshot.png' });
    await page.screenshot({ path: 'screenshots/highlight-screenshot.png', mask: [btn], maskColor: '#FFFFFF', style: 'textarea[name=q]{border: 2px red solid}' });
    await searchBox.screenshot({ path: 'screenshots/search-box.png' });

});