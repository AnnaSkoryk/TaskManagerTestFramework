import { Page } from 'playwright-core';
import { test, expect } from '@playwright/test';
import { ITestData } from '../TestData/TestData';

export class CreateTaskPage {
  readonly taskTitleLocatorById = '#taskTitle';
  readonly taskDescriptionLocatorById = '#taskDescription';
  readonly taskDueDateLocatorById = '#taskDueDate';
  readonly taskPriorityLocatorById = '#taskPriority';
  readonly saveButtonLocatorById = '#saveBtn';
  readonly cancelButtonLocatorById = '#cancelBtn';

  constructor(private page: Page) {}

  async fillTaskForm(title: string, description: string, priority: string, dueDate: string) {
    await this.page.fill(this.taskTitleLocatorById, title);
    await this.page.fill(this.taskDescriptionLocatorById, description);
    await this.page.fill(this.taskDueDateLocatorById, dueDate);
    await this.page.selectOption(this.taskPriorityLocatorById, priority);
  }

  async clickSaveButton() {
    await this.page.click(this.saveButtonLocatorById);
  }

  async clickCancelButton() {
    await this.page.click(this.cancelButtonLocatorById);
  }
}