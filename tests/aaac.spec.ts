import test from "@playwright/test";

// If there is > 1 worker, beforeAll will run more than 1 time
test.beforeAll('Before all', async({}, testInfo) => {
    console.log(`beforeAll title: ${testInfo.title} pidx: ${testInfo.parallelIndex}`);
})

test.beforeEach(async({}, testInfo) => {
    // setup
});

test.afterEach(async({}, testInfo) => {
    // setup
});

// Runs once after all test cases in this file
test.afterAll(async({}, testInfo) => {
    // cleanup
});


// When tests are in groups, the beforeAll, beforeEach etc will only apply to the test in that group
test.describe('group 1', () =>{
    test.beforeAll(async({}, testInfo) => {
        console.log(`GROUP1 beforeAll title: ${testInfo.title} pidx: ${testInfo.parallelIndex}`);
    })
    
    test.beforeEach(async({}, testInfo) => {
        // setup
        console.log(`GROUP1 beforeEach. Title: ${testInfo.title}`);
    });

    test('g1 test 1', async({}, testInfo) => {
        console.log(`GROUP1 In g1 test 1. Title: ${testInfo.title}`);
    });

    test('g1 test 2', async({}, testInfo) => {
        console.log(`GROUP1 In g1 test 2. Title: ${testInfo.title}`);
    });
    
    test.afterEach(async({}, testInfo) => {
        // setup
        console.log(`GROUP1 afterEach. Title: ${testInfo.title}`);
    });
    
    // Runs once after all test cases in this file
    test.afterAll(async({}, testInfo) => {
        // cleanup
        console.log(`GROUP1 afterAll. Title: ${testInfo.title}`);
    });
});