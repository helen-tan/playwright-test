import test, { expect } from "@playwright/test";

// Add extra info to reports using annotation

// conditional skipping
test('skip this test on chromium', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'Still working on it!');
});

test.describe('chromium only', () => {
    // conditional skipping
    test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

    test ('test 1', () => {
        // this test is only run in chromiumn
    });

    test ('test 2', () => {
        // this test is only run in chromiumn
    });
});

test.fixme('Must fix', async ({ page }) => {
    await page.goto("https://chetanpanchal.com");
    await expect(page).toHaveTitle('Home - Newtonica');
});

test ('test a page with annotation', {
    annotation: {
        type: 'issue',
        description: 'https://github.com/microsoft/playwright/issue/123'
    }
} , () => {
    // ...
});

test.describe('report tests', {
    annotation: { type: 'category', description: 'report' }
}, () => {
    test('test report header', async ({ page }) => {
        // ...
    })

    test('test full report', {
        annotation: [
            { type: 'issue', description: 'https://github.com/microsoft/playwright/issue/123' },
            { type: 'performance', description: 'very slow test!' }
        ]
    }, async ({ page }) => {
        // ...
    });

    test('example test', async ({ page, browser }) => {
        test.info().annotations.push({
            type: 'browser version',
            description: browser.version()
        });
        
        // ...
    });
});