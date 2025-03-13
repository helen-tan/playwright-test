import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Directory containing test code, relative to this config file
  testDir: './tests',

  // Glob patterns or regular expressions to ignore test files.
  //testIgnore: '*test-to-ignore',

  // Glob patterns or regular expressions that match test files.
  // testMatch: '.*(test|spec).(js|ts|mjs)',
  // testMatch: /.*\.my\.ts/i,

  // Folder for test artifacts such as screenshots, videos, traces, etc.
  //outputDir: 'test-results',

  // path to the global setup files to run before all tests. That file must export a single function.
  globalSetup: 'global.setup.ts',

  // path to the global teardown files to run before all tests. That file must export a single function.
  globalTeardown: 'global.teardown.ts',

  // Each test is given 30 seconds.
  // Time spent by the test function, fixtures, beforeEach and afterEach hooks is included in the test timeout.
  //timeout: 30000, //test.setTimeout(120000)
  //globalTimeout: <some>

  /* Run all tests in all files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,  //cond? T:F //cond1? (cond2? T: F1): F2

  /* Opt out of parallel tests on CI. Can be number of workers or percentage of logical CPU cores e.g. 50% */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html', //"list", "line", "dot", "json", "junit", "null", "github", "html", "blob", "markdown" (default: "list")
  //reporter: process.env.CI ? 'github' : 'list',
  //reporter: './custom-reporter.ts',
  /*
  reporter: [
    ['list', { printSteps: true }],
    ['json', {  outputFile: 'test-results.json' }],
    ['html', { open: 'never', outputFolder: 'my-report' }],
    ['blob', { outputDir: 'my-report', fileName: `report-${os.platform()}.zip` }],
    ['junit', { outputFile: 'results.xml' }],

  ],
  */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    person: 'Narendra Modi',
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    // Populates context with given storage state.
    //storageState: 'state.json',

    // Emulates `'prefers-colors-scheme'` media feature.
    //colorScheme: 'dark',

    // Context geolocation.
    //geolocation: { longitude: 12.492507, latitude: 41.889938 },

    // Emulates the user locale.
    //locale: 'en-GB',

    // Emulates the user timezone.
    //timezoneId: 'Europe/Paris',

    // Grants specified permissions to the browser context.
    //permissions: ['geolocation', 'notifications'],

    // Viewport used for all pages in the context.
    //viewport: { width: 1280, height: 720 },

    // Whether to automatically download all the attachments.
    //acceptDownloads: false,

    // An object containing additional HTTP headers to be sent with every request.
    /*extraHTTPHeaders: {
      'X-My-Header': 'value',
    },*/

    // Credentials for HTTP authentication.
    /*httpCredentials: {
      username: 'user',
      password: 'pass',
    },*/

    // Whether to ignore HTTPS errors during navigation.
    //ignoreHTTPSErrors: true,

    // Whether to emulate network being offline.
    //offline: true,

    // Proxy settings used for all pages in the test.
    /*proxy: {
      server: 'http://myproxy.com:3128',
      bypass: 'localhost',
    },*/

    // Capture screenshot after each test failure.
    //'off', 'on' and 'only-on-failure'
    //screenshot: 'only-on-failure', 

    // Record trace only when retrying a test for the first time.
    //'off', 'on', 'retain-on-failure' and 'on-first-retry'
    //trace: 'on-first-retry', 

    // Record video only when retrying a test for the first time.
    //'off', 'on', 'retain-on-failure' and 'on-first-retry'
    video: 'on-first-retry',

    // Maximum time each action such as `click()` can take. Defaults to 0 (no limit).
    //actionTimeout: 0,
    //navigationTimeout: 10000

    // Name of the browser that runs tests. For example `chromium`, `firefox`, `webkit`.
    //browserName: 'chromium',

    // Toggles bypassing Content-Security-Policy.
    //bypassCSP: true,

    // Channel to use, for example "chrome", "chrome-beta", "msedge", "msedge-beta".
    //channel: 'chrome',

    // Run browser in headless mode.
    //headless: false,

    // Change the default data-testid attribute.
    //testIdAttribute: 'pw-test-id',

    /*launchOptions: {
      slowMo: 50,
    },*/

    //userAgent: 'some custom ua',

    //javaScriptEnabled: false
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], locale: 'en-IN', person: 'Narendra Modi'},
      //override Global settings
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], viewport: { width: 1280, height: 720 }, },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },

    // {
    //   name: 'chromium',
    //   use: {
    //     ...devices['Desktop Chromium'],
    //     viewport: null,
    //     launchOptions: {
    //       args: ["--start-maximized"]
    //     }
    //   },
    // },

    // project dependencies
    /*{
      name: 'setup db',
      testMatch: /global\.setup\.ts/,
      teardown: 'cleanup db',
    },
    {
      name: 'cleanup db',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: 'chromium with db',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup db'], //this will run first
    },*/

    //parameterization
    /*{
      name: 'chetan-project',
      use: { person: 'Chetan' },
    },
    {
      name: 'hetal-project',
      use: { person: 'Hetal' },
    },*/

    //different environments
    /*
    {
      name: 'staging',
      use: {
        baseURL: 'staging.example.com',
      },
      retries: 2,
    },
    {
      name: 'production',
      use: {
        baseURL: 'production.example.com',
      },
      retries: 0,
    },*/

    //splitting into groups of tests
    /*
    {
      name: 'Smoke',
      testMatch: /.*smoke.spec.ts/,
      retries: 0,
    },
    {
      name: 'Default',
      testIgnore: /.*smoke.spec.ts/,
      retries: 2,
    },*/
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    //timeout: 5000, 
    //expect(locator).toBeVisible({ timeout: 10000 })
    //await expect(page.getByRole('button')).toHaveText('Sign in', { timeout: 10000 });

    /*toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },*/

    /*toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the
      // total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },*/
  },
});
