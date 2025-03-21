import { Locator, Page } from "@playwright/test";

// methods used in tests/test-abstraction.spec.ts

export class TodoPage {
    private readonly inputBox: Locator;
    private readonly todoItems: Locator;

    constructor (public readonly page: Page) {
        this.inputBox = this.page.locator('input.new-todo');
        this.todoItems = this.page.getByTestId('todo-item');
    }

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async addToDo(text: string) {
        await this.inputBox.fill(text);
        await this.inputBox.press('Enter');
    }

    async remove(text: string) {
        const todo = this.todoItems.filter({ hasText: text });
        await todo.hover();
        await todo.getByLabel('Delete').click();
    }

    async removeAll() {
        let count = await this.todoItems.count();
        console.log(`Removing ${count} items`);
        while((await this.todoItems.count()) > 0) {
            await this.todoItems.first().hover();
            await this.todoItems.getByLabel('Delete').first().click();
        }
    }
}