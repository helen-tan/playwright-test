import { test as base, expect } from "@playwright/test";
import { TodoPage } from "../pages/TodoPage";

base.use({ launchOptions: { slowMo: 500 } });

export const test = base.extend<{todoPage: TodoPage}>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);
        await todoPage.goto();
        await todoPage.addToDo('item 1');
        await todoPage.addToDo('item 2');
        await use(todoPage);
        await todoPage.removeAll();
    },
});

test('Add 1 item', async({ todoPage }) => {
    await todoPage.addToDo('my item');
});

test('Remove 1 item', async({ todoPage }) => {
    await todoPage.remove('item 1');
});