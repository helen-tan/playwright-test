import { test, expect } from "./fixtures/parameterize-fixtures";

const people = ['bob', 'joe', 'harry'];
// test.use({ person: 'user1' }); moved to parametrize-fixtures.ts as defaults

for (let name of people) {
    test(`testing with ${name}`, async () => {
        console.log(`testing with person ${name}`); 
    });
}


// Fixtures: Fixtures in Playwright are predefined setups that provide reusable objects and configurations for your tests. 

test(`test 1`, async ({ person }) => {
    console.log(`testing with person: ${person}`); // user 1 should be here
});

test.describe('para group', () => {
    test.use({ person: 'user2' });

    test(`test 1`, async ({ person }) => {
        console.log(`testing with person: ${person}`); // user 2 should be here
    });
});
