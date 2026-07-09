import { test, expect } from '@playwright/test';
import { TestData } from './TestData/TestData';
import * as methods from './TestMethods';

test.describe('Smoke tests', () => {

    test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:8080');
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:8080');
    });

    test('Create task shows success message', async ({ page }) => {
        await methods.CreateNewTask(page, TestData);
        //await methods.CheckSuccessMessage(page, TestData);
        await methods.ValidateCreatedTask(page, TestData);
    });

    test('Cancel create task', async ({ page }) => {
        await methods.CreateNewTask(page, TestData, true);
        await methods.CheckTaskElementCreated(page, TestData, false);
    });

    test('Completed Task is present after reftesh', async ({ page }) => {
        await methods.CreateNewTask(page, TestData);
        await methods.ValidateTaskCompletedAfterRefresh(page, TestData);
    });

    test('Active tab validation', async({ page }) => {

    });

    test('Completed tab validation', async({ page }) => {

    });

    test('All tab validation', async({ page }) => {

    });

    test('Create task without Date', async({ page }) => {

    });

    test('Create task with Date before today', async({ page }) => {

    });

    test('Delete task', async({ page }) => {

    })
});