import { Page } from 'playwright-core';
import { test, expect } from '@playwright/test';

export class MainPage {
    readonly addButtonLocatorById = '#addBtn';
    readonly successMessageLocatorById = '#successMessage';
    readonly taskListLocatorById = '#taskList';

    constructor(private page: Page) {
    }

    async clickAddButton() {
        await this.page.click(this.addButtonLocatorById);
    }

    async IsSuccessMessageVisible(expectedMessage: string, timeout? : number) {
        const message = this.page.locator(this.successMessageLocatorById);
        await expect(message, `Expected message "${expectedMessage}" to appear`).toBeVisible();
        await expect(message, `Expected message "${expectedMessage}" to contain the correct text`).toContainText(expectedMessage);
        if(timeout){
            await this.page.waitForTimeout(timeout);
            await expect(message, `Expected message "${expectedMessage}" still to be visible`).toBeVisible();
        }
        await expect(message, `Expected message "${expectedMessage}" to be hidden`).toBeHidden();
    }

    async IsElementExistsOnGrid(textToFind: string, byTitle: boolean = true) {
        const taskList = this.page.locator(this.taskListLocatorById);
        const newTask = taskList.locator('.task-info', { hasText:  textToFind });
        await newTask.last().scrollIntoViewIfNeeded();
        await expect(newTask.last(), `Expected task "${textToFind}" to appear in the task list`).toBeVisible();
    }
}