import { expect, test } from '@playwright/test';

// COMMANDS TO RUN TESTS:
// npx playwright test <filename>                                        | test single file
// npx playwright test                                                   | test all files
// npx playwright test --headed <filename>                               | headed(opens browsers, slower, for when writing test cases)
// headless (faster, for stable test cases): leave out --headless
// npx playwright test --list / npc playwright test <filename> --list    | see which test cases will be identified for a command
// npx playwright test <filename>:<line number>                          | run one test case, at this line number
// npx playwright test <filename>:<line number> -- list                  | list the test case, at this line number
// npx playwright test firstdemo.spec.ts:36 --project chromium --list    | '--project chromium' lists test cases for chrome browser only
// npx playwright test firstdemo.spec.ts:36 --project chromium           | run 1 test case at line 36 for chrome browser
// npx playwright test firstdemo.spec.ts --project chromium --workers <number>  | run test cases with x number of workers. if its 2 workers, playwright will run the tests in parallel with 2 worker processes. Tests will be divided among the workers. If worker=1, the tests will run sequentially 
// npx playwright test firstdemo.spec.ts:60 --project firefox --workers 1 --trace on | 'trace on' - will show the trace viewer (takes screenshots of the test)
// npx playwright test --ui                                               | shows a ui dashboard for running test cases. no test cases run yet.
// npx playwright test -g duckduckgo --project "Microsoft Edge" --headed  | "-g duckduckgo" runs only tests whose name contains 'duckduckgo'
// npx playwright test -g duckduckgo --project "Mobile Chrome" --headed   | 'Mobile Chrome' will change the viewport size (must declare a project 'Mobile Chrome' in playwright.config.ts)
// npx playwright test -g duckduckgo --reporter <reporter type: list, html, json... etc.>  | If no reporter is set in playwright.config.ts, Playwright defaults to list. Can override it using --reporter in the command line
// npx playwright test -g duckduckgo --reporter list                      | '--reporter list' sets the test result output format to list. The list reporter prints the summary of test results in a simple readable format.


// should not be a blocking call, so that other processes in other tests can run
// so, we make the lambda asynchronous and await
// playwright will instantiate a new instance of page is created everytime a page is declared here. it will not reuse a page. Fresh instance of browser is created
// So 2 tests can run in parallel. test 1 and 2 will run in their own browsers. the await keyword will not stop other tests from running
test('testing google search page', async ({ page }) => {
    await page.goto('https://www.google.com'); // need to wait for this to come back

    await expect(page).toHaveTitle('Google');
    // await expect(page.title()).resolves.toBe('Google');
});

test('testing bing search page', async({ page }) => {
    await page.goto('https://www.bing.com');

    await expect(page).toHaveTitle('Search - Microsoft Bing');
});

test('testing tv tropes', async ({ page }) => {
    await page.goto('https://tvtropes.org/');

    await expect(page).toHaveTitle('TV Tropes');
});

// helpful if there is a 'data-testId' attribute in html
// test not working - so test.skip
test.skip('testing google search page for india', async ({ page }) => {
    await page.goto('https://www.google.com');
    // Confirm that we are at Google
    await expect(page).toHaveTitle('Google');

    // Get the search box
    // no need await as this fn getByLabel is not returning a promise. Returning a locator
    // also an ASSERTION. If it cannot find the element in the DOM tree, test will be marked as fail
    let searchBox = page.getByLabel('Search', { exact: true });
    // Fill search box with 'India'
    await searchBox.fill('india');
    // Press Enter
    await searchBox.press('Enter'); // instead of page.keyboard.press('Enter'), to be more specific

    await expect(page).toHaveTitle('india - Google search');
});

// note: duckduckgo test will fail when running in headless (no browser appearing). When running in headed, it passes.
// we usually are not aware how a production site will respond to automation
// so its a best practice to test in a test environment where we have control of the environment. Testing a public site is not best
test('testing duckduckgo search page for india', async ({ page }) => {
    await page.goto('https://www.duckduckgo.com');
    await expect(page).toHaveTitle('DuckDuckGo - Protection. Privacy. Peace of mind.');

    // let searchBox = page.getByLabel('Search with DuckDuckGo', { exact: true });
    // let searchBox = page.locator('#searchbox_input'); // using css selector
    let searchBox = page.locator('//*[@id="searchbox_input"]'); // using XPath
    // let searchButton = page.getByRole('button', { name: 'Search' });
    let searchButton = page.getByLabel('Search', { exact: true }); // this button has an aria-label, so getByLabel will work. but must be exact in this case
    await searchBox.fill('india');
    // await searchBox.press('Enter');
    await searchButton.click();
    
    await expect(page).toHaveTitle('india at DuckDuckGo', { timeout: 10000 });
});

test.describe('google search home page', () => {
    const url = 'https://www.google.com';
    test('goto google', async ({ page }) => {
        await page.goto(url);
    });

    test('check google title', async ({ page }) => {
        await page.goto(url);
        await expect(page).toHaveTitle('Google');
    });

}) 

test('search google wait', async ({ page }) => {
    const LABEL = 'Search';
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle('Google');

    // let searchBox = page.getByLabel(LABEL, { exact: true });
    let searchBoxLocator = page.locator('css=#searchbox_input'); // can put CSSPath. no need to put css bcos playwright can tell
    await searchBoxLocator.clear();
    await searchBoxLocator.fill('funny');
    await searchBoxLocator.press('Enter');

    // flaky way
    // let title = await page.title(); // can be flaky because the page title might not be fully loaded when page.title() is called. This will just take whatever title thats present at that moment.
    // expect(title).toBe('Google'); // assertion will not retry if failed
 
    // better way:
    // expect(page).toHaveTitle() keeps retrying until the title matches or the timeout expires.
    await expect(page).toHaveTitle('funny - Google Search', { timeout: 7000 });

    // allow for F or f with regex
    // await expect(page).toHaveTitle(/funny - Google Search/i);

});