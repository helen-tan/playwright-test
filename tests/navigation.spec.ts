import test from "@playwright/test";

// slowMo: slow down each step by 500ms so that we can see what is happening
// args: ['--start-maximized'] : maximize window size
test.use({ launchOptions: { slowMo: 500, args: ['--start-maximized'] } });

test('navigation test', async ({ page }) => {
    await page.goto('https://tvtropes.com');
    await page.goto('https://google.com');
    await page.goBack();
    await page.goForward();

    let searchBox = await page.getByLabel('Search', { exact: true });
    for (const link of await page.getByRole('link').all()) {
        console.log(await link.innerText());
    }
    const linkTexts = await page.getByRole('link').allInnerTexts();

    console.log(linkTexts);
    console.log(await searchBox.boundingBox());
    console.log(await searchBox.getAttribute('name'));
});