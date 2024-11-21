import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Scenario Tests', () => {
  test('Should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo('https://mitraku-dev.on-premise.mitrais-dev.com/');
    await loginPage.login('mitraku-auto@yopmail.com', 'Qwe123!@#');
    await page.waitForURL('**/store')
    expect(await page.url()).toBe('https://mitraku-dev.on-premise.mitrais-dev.com/store')
  });
});