import { Page } from 'playwright-core';
import { ITestData } from './TestData/TestData';
import { MainPage } from './PageObject/MainPage';
import { CreateTaskPage } from './PageObject/CreateTaskPage';
import { expect } from '@playwright/test';

export async function CreateNewTask(page: Page, testData: ITestData) {
    const mainPage = new MainPage(page);
    const createTaskPage = new CreateTaskPage(page);
    await mainPage.clickAddButton();
    await createTaskPage.fillTaskForm(testData.title, testData.description, testData.dueDate, testData.priority);
    await createTaskPage.clickSaveButton();
}

export async function ValidateSuccessMessage(page : Page, testData: ITestData) {
    const mainPage = new MainPage(page);
    await mainPage.IsSuccessMessageVisible(testData.successMessage, 1000); //isElementVisisble: boolean; in this mthods split is ElementVisible and Validation of text.
}

export async function ValidateCreatedTask(page : Page, testData: ITestData) {
    const mainPage = new MainPage(page);

    expect(await mainPage.IsTaskExistsOnGrid(testData.title), `Expected task "${testData.title}" to exist on the grid`).toBe(true);
    await mainPage.ValidateTaskDetailsOnGrid(testData.title, testData.description, testData.dueDate, testData.priority);
}