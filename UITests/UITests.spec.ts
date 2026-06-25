import {test} from '@playwright/test';

test('BaseTest', async ({ page }) => {
await page.goto('http://127.0.0.1:8080');
await page.waitForTimeout(3000);
await page.reload();
})