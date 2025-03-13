import test from "@playwright/test";

// npx playwright test tags --grep "@fast"  | runs only tests with '@fast' tag. --grep flag is used to ilter and run only test cases that match a specific pattern. 
// npx playwright test tags --grep --% "@fast|@slow"
 
// --grep "pattern"          | Runs tests that match the pattern
// --grep /regex/            | Runs tests that match the regex
// --grep-invert "pattern"   | Excludes tests that match the pattern

test('test 1', {
    tag: ['@fast', '@one']
}, async () => {
    // ...
});

test('test 2', {
    tag: ['@slow', '@two']
}, async () => {
    // ...
});

test('test 3', {
    tag: ['@fast', '@three']
}, async () => {
    // ...
});

test('test 4', {
    tag: ['@slow', '@four']
}, async () => {
    // ...
});

test.describe('group test', { 
    tag: ['@grouptag'] 
} , () => {
    test('group test 1', async () => {
        // ...
    });

    test('group test 2', {
        tag: ['@slow', '@bug']
    }, async () => {
        // ...
    });

});
