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
    })

});