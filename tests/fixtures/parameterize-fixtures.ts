import { test as base } from '@playwright/test';

export type TestOptions = {
    person: string;
}

export const test = base.extend<TestOptions>({
    // Define an option and provide a default value
    // We can later override it in the config
    // person: ['<Default Values>', { option: true }]
    person: ['user1', { option: true }],

    // Override default 'page' fixture
    page: async({ page, person }, use) => {
        await page.goto('https://duckduckgo.com/?q=' + person);
        // Each test will get a "page" that already has a person name
        await use(page);
        // cleanup
    }
});

export { expect } from '@playwright/test';
