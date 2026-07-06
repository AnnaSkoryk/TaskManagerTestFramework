import { Page } from 'playwright-core';
import { expect } from '@playwright/test';
import {DateHelper} from '../../Helpers/dateHelpers';

export class MainPage {
    readonly addButtonLocatorById = '#addBtn';
    readonly successMessageLocatorById = '#successMessage';
    readonly taskListLocatorById = '#taskList';

    constructor(private page: Page) {}

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

    async IsTaskExistsOnGrid(textToFind: string, byTitle: boolean = true) : Promise<Boolean> {
        const taskList = this.page.locator(this.taskListLocatorById);
        const newTask = taskList.locator('.task-info', { hasText:  textToFind }).last();
        if (await newTask.count() === 0) {
            return false;
        }
        await newTask.scrollIntoViewIfNeeded();
        await expect(newTask, `Expected task "${textToFind}" to appear in the task list`).toBeVisible();
        return true;
    }

    async ValidateTaskDetailsOnGrid(title: string, description: string, dueDate: string, priority: string) {
        const dateHelper = new DateHelper(dueDate);
        const taskList = this.page.locator(this.taskListLocatorById);
        const newTask = taskList.locator('.task-info', { hasText:  title }).last();
        await expect(newTask.locator('.task-title'), `Expected task title to be "${title}"`).toHaveText(title);
        await expect(newTask.locator('.task-description'), `Expected task description to be "${description}"`).toHaveText(description);

        const formattedDate = dateHelper.getFormattedDate();
        console.log(`Formatted date: ${formattedDate}`); // Debugging line to check the formatted date
        await expect(newTask.locator('.task-date'), `Expected task due date to be "${dueDate}"`).toHaveText(formattedDate);
        await expect(newTask.locator('.priority-badge.priority-high'), `Expected task priority to be "${priority}"`).toHaveText(priority);
    }
}