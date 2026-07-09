import { Page } from 'playwright-core';
import { ITestData } from './TestData/TestData';
import { MainPage } from './PageObject/MainPage';
import { CreateTaskPage } from './PageObject/CreateTaskPage';
import { expect } from '@playwright/test';

let countOfElementsBeforeCreation: number;

export async function CreateNewTask(page: Page, testData: ITestData, withCancellation: boolean = false) {
    
    const mainPage = new MainPage(page);
    const createTaskPage = new CreateTaskPage(page);
    countOfElementsBeforeCreation = await mainPage.getTaskElementCount();

    await mainPage.clickAddButton();
    await createTaskPage.fillTaskForm(testData.title, testData.description, testData.dueDate, testData.priority);
    if (withCancellation) {
        await createTaskPage.clickCancelButton();
        CheckTaskElementCreated(page, testData, false);
    }
    else {
        await createTaskPage.clickSaveButton();
        CheckTaskElementCreated(page, testData, true);
    }
}

export async function ValidateSuccessMessage(page : Page, testData: ITestData) {
    const mainPage = new MainPage(page);
    expect(await mainPage.isSuccessMessageVisible(testData.successMessage, 1000), `Expected success message "${testData.successMessage}" to be visible`).toBe(true);
}

export async function ValidateCreatedTask(page : Page, testData: ITestData) {
    const mainPage = new MainPage(page);
    await mainPage.validateTaskDetailsOnGrid(testData.title, testData.description, testData.dueDate, testData.priority);
}

export async function CheckTaskElementCreated(page : Page, testData: ITestData, isCreated: boolean) {
    const mainPage = new MainPage(page);
    if (isCreated)  
        await expect.poll(
            async () => await mainPage.getTaskElementCount(),
            { message: 'Expected task to be created', timeout: 5000 }
        ).toBe(countOfElementsBeforeCreation + 1);
    else
        await expect.poll(
            async () => await mainPage.getTaskElementCount(),
            { message: 'Expected task not to be created', timeout: 5000 }
        ).toBe(countOfElementsBeforeCreation);
}

export async function ValidateTaskCompletedAfterRefresh(page : Page, testData: ITestData){
    const mainPage = new MainPage(page);
    await mainPage.setCompleted(testData.title, true);
    await page.reload();

    await mainPage.validateCompletedTask(testData.title);
}