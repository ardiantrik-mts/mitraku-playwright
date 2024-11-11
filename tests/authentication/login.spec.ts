import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo('https://mitraku-dev.on-premise.mitrais-dev.com/');
    await loginPage.login('mitraku_reg001@yopmail.com', 'Qwe123!@#');
    await page.waitForURL('**/store')
    expect(await page.url()).toBe('https://mitraku-dev.on-premise.mitrais-dev.com/store')
    // expect(await dashboardPage.getWelcomeMessage()).toContain('Welcome, testuser');
  });
});