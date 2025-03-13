import test from "@playwright/test";
import { TodoPage } from "./pages/TodoPage";

test.use({ launchOptions: { slowMo: 500 } });

test.describe('todo test without context', () => {
    let todoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);

        await todoPage.goto();
        await todoPage.addToDo('item 1');
        await todoPage.addToDo('item 2');
    });

    test.afterEach(async () => {
        await todoPage.removeAll();
    });

    test('Add 1 item', async () => {
        await todoPage.addToDo('my item');
    });

    test('Remove 1 item', async () => {
        await todoPage.remove('item 1');
    });
});
