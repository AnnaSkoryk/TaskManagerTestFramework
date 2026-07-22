import { test, expect } from '@playwright/test';
import {GeneralTestData, TestDataWoDate, TestDataWithDateBeforeToday} from './TestData/TestData';
import * as methods from './TestMethods';
import {ValidateSuccessMessage} from "./TestMethods";

test.describe('Smoke tests', () => {

    test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:8080');
    //Post default Data via Api
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:8080');
    });

    test('Create task shows success message', async ({ page }) => {
        await methods.CreateNewTask(page, GeneralTestData);
        await methods.ValidateSuccessMessage(page, GeneralTestData);
        await methods.ValidateCreatedTask(page, GeneralTestData);
    });

    test('Cancel create task', async ({ page }) => {
        await methods.CreateNewTask(page, GeneralTestData, true);
        await methods.CheckTaskElementCreated(page, GeneralTestData, false);
    });

    test('Completed Task is present after reftesh', async ({ page }) => {
        await methods.CreateNewTask(page, GeneralTestData);
        await methods.ValidateTaskCompletedAfterRefresh(page, GeneralTestData);
    });

    test('Active tab validation', async({ page }) => {
        await methods.ChaeckActiveTab(page);
    });

    test('Completed tab validation', async({ page }) => {
        await methods.ChaeckCompletedTab(page);
    });

    test('All tab validation', async({ page }) => {
        await methods.ChaeckAllTab(page);
    });

    test('Create task without Date', async({ page }) => {
        await methods.CreateNewTask(page, TestDataWoDate);
        await methods.ValidateCreatedTask(page, TestDataWoDate);
    });

    test('Create task with Date before today', async({ page }) => {
        await methods.CreateNewTask(page, TestDataWithDateBeforeToday);
        await methods.ValidateCreatedTask(page, TestDataWithDateBeforeToday);
    });

    test('Delete task', async({ page }) => {
        await methods.CreateNewTask(page, GeneralTestData);
        await methods.DeleteTask(page, GeneralTestData);
        await methods.ValidateTaskIsDeleted(page, GeneralTestData);
    })
});