import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { StorePage } from '../../pages/store-page/StorePage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateTo('https://mitraku-dev.on-premise.mitrais-dev.com/');
    await loginPage.login('mitraku_reg001@yopmail.com', 'Qwe123!@#');
    await page.waitForURL('**/store')
});

test.describe('Store Tests', () => {
  test('should edit store successfully with valid data', async ({ page }) => {
    const storePage = new StorePage(page)

    await storePage.clickEditStore()
    await page.waitForURL('**/store/edit')
    expect(await page.url()).toBe('https://mitraku-dev.on-premise.mitrais-dev.com/store/edit')
  });
});