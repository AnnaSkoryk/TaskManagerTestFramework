import { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';
import { DateHelper } from '../../Helpers/dateHelpers';

export class MainPage {
    readonly addButton: Locator;
    readonly successMessage: Locator;
    readonly taskList: Locator;

    private readonly selectors = {
        taskRow: 'li',
        taskInfo: '.task-info',
        taskTitle: '.task-title',
        taskDescription: '.task-description',
        taskDate: '.task-date',
        priorityBadge: '.priority-badge',
        checkbox: '.task-complete input[type="checkbox"]',
    };

    constructor(private page: Page) {
        this.addButton = page.locator('#addBtn');
        this.successMessage = page.locator('#successMessage');
        this.taskList = page.locator('#taskList');
    }

    private getTaskRowElements(textToFind: string) {
        const row = this.taskList.locator(this.selectors.taskRow).filter({hasText: textToFind}).last();

        return {
            row,
            info: row.locator(this.selectors.taskInfo),
            title: row.locator(this.selectors.taskInfo).locator(this.selectors.taskTitle),
            description: row.locator(this.selectors.taskInfo).locator(this.selectors.taskDescription),
            date: row.locator(this.selectors.taskInfo).locator(this.selectors.taskDate),
            priorityBadge: row.locator(this.selectors.taskInfo).locator(this.selectors.priorityBadge),
            checkbox: row.locator(this.selectors.checkbox),
        };
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
        const newTask = this.getTaskRowElements(textToFind)

        if (await newTask.row.count() === 0)
            return false;
        await newTask.row.scrollIntoViewIfNeeded();
        await expect(newTask.row, `Expected task "${textToFind}" to appear in the task list`).toBeVisible();
        return true;
    }

    async validateTaskDetailsOnGrid(title: string, description: string, dueDate: string, priority: string) {
        const dateHelper = new DateHelper(dueDate);
        const newTask = this.getTaskRowElements(title);
        await newTask.row.scrollIntoViewIfNeeded();
        await expect(newTask.title, `Expected task title to be "${title}"`).toHaveText(title);
        await expect(newTask.description, `Expected task description to be "${description}"`).toHaveText(description);
        await expect(newTask.date, `Expected task due date to be "${dueDate}"`).toHaveText(dateHelper.getFormattedDate());
        await expect(newTask.priorityBadge, `Expected task priority to be "${priority}"`).toHaveText(priority);
        await expect(newTask.checkbox, `Expected new task checkbox to be unchecked`).not.toBeChecked();
    }

    async getTaskElementCount(): Promise<number>{
        return await this.taskList.locator('li').count();
    }

    async setCompleted(title: string, isCompleted: boolean = false) {
        const newTask = this.getTaskRowElements(title);
        const isCurrentlyChecked = await newTask.checkbox.isChecked();
        if (isCurrentlyChecked !== isCompleted) {
            await newTask.checkbox.click();
        }
    }

    async validateCompletedTask(title: string) {
        const newTask = this.getTaskRowElements(title);
        await expect(newTask.checkbox, 'Expected task checkbox to be checked').toBeChecked();
        await expect(newTask.title, 'Expected task title to be crossed with line').toHaveCSS('text-decoration-line', 'line-through');
    }
}