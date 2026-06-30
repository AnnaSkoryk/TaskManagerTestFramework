import { Page } from 'playwright-core';
import { ITestData } from './TestData/TestData';
import { MainPage } from './PageObject/MainPage';
import { CreateTaskPage } from './PageObject/CreateTaskPage';

export async function CreateNewTask(page: Page, testData: ITestData) {
    const mainPage = new MainPage(page);
    const createTaskPage = new CreateTaskPage(page);
    await mainPage.clickAddButton();
    await createTaskPage.fillTaskForm(testData.title, testData.description, testData.dueDate, testData.priority);
    await createTaskPage.clickSaveButton();
}

export async function CheckSuccessMessage(page : Page, testData: ITestData) {
    const mainPage = new MainPage(page);
    await mainPage.IsSuccessMessageVisible(testData.successMessage, 1000);
}

export async function CheckTaskExistsOnGrid(page : Page, testData: ITestData) {
    const mainPage = new MainPage(page);
    await mainPage.IsElementExistsOnGrid(testData.title);
}