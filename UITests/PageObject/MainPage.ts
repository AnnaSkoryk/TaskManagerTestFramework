import { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';
import { DateHelper } from '../../Helpers/dateHelpers';

export class MainPage {
    readonly addButton: Locator;
    readonly successMessage: Locator;
    readonly taskList: Locator;

    constructor(private page: Page) {
        this.addButton = page.locator('#addBtn');
        this.successMessage = page.locator('#successMessage');
        this.taskList = page.locator('#taskList');
    }

    private taskCard(textToFind: string): Locator {
        return this.taskList.locator('.task-info', { hasText: textToFind }).last();
    }
    
    async clickAddButton() {
        await this.addButton.click();
    }

    async isSuccessMessageVisible(expectedMessage: string, timeout?: number) {
        await expect(this.successMessage, `Expected message "${expectedMessage}" to appear`).toBeVisible();
        await expect(this.successMessage, `Expected message "${expectedMessage}" to contain the correct text`).toContainText(expectedMessage);
        if (timeout) {
            await this.page.waitForTimeout(timeout);
            await expect(this.successMessage, `Expected message "${expectedMessage}" still to be visible`).toBeVisible();
        }
        await expect(this.successMessage, `Expected message "${expectedMessage}" to be hidden`).toBeHidden();
    }

    async isTaskExistsOnGrid(textToFind: string): Promise<boolean> {
        const newTask = this.taskCard(textToFind);
        if (await newTask.count() === 0) {
            return false;
        }
        await newTask.scrollIntoViewIfNeeded();
        await expect(newTask, `Expected task "${textToFind}" to appear in the task list`).toBeVisible();
        return true;
    }

    async validateTaskDetailsOnGrid(title: string, description: string, dueDate: string, priority: string) {
        const dateHelper = new DateHelper(dueDate);
        const newTask = this.taskCard(title);

        await expect(newTask.locator('.task-title'), `Expected task title to be "${title}"`).toHaveText(title);
        await expect(newTask.locator('.task-description'), `Expected task description to be "${description}"`).toHaveText(description);

        const formattedDate = dateHelper.getFormattedDate();
        await expect(newTask.locator('.task-date'), `Expected task due date to be "${dueDate}"`).toHaveText(formattedDate);
        await expect(newTask.locator('.priority-badge.priority-high'), `Expected task priority to be "${priority}"`).toHaveText(priority);
    }
}