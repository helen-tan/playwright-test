import test from "@playwright/test";

test.use({ launchOptions: { slowMo: 500} });

test('Test tabs handling', async ({ page, context }) => {
    await page.goto('http://demo.chetanpanchal.com');

    const originalPage = page;
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // wait for new tab
        page.locator('#loadContentInWindow').click() // click button to open new tab
    ]);

    await printTabs(context);

    // Switch back to original tab
    await originalPage.bringToFront();
    await newPage.waitForTimeout(3000); // Equivalent to sleep(3) / pause execution of test

    // Switch to new tab
    await newPage.bringToFront();
    await newPage.waitForTimeout(3000); // Equivalent to sleep(3) / pause execution of test
    
    
    // Close new tab and switch back
    await newPage.close();
    await originalPage.bringToFront();

})

async function printTabs(context) {
    console.log('---------------- Current Tabs');
    for (const page of context.pages()) {
        await page.bringToFront();
        const windowName = await page.evaluate(() => window.name);
        console.log(windowName === '' ? 'main' : windowName);
    }
    console.log('---------------- End');
}