import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { testData } from '../../utils/testData';

test.describe('Login Scenario Tests', () => {
  test('Should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo('https://mitraku-dev.on-premise.mitrais-dev.com/');
    await loginPage.login(testData.usersCollection.validUser.email, testData.usersCollection.validUser.password);
    await page.waitForURL('**/dashboard')
    expect(await page.url()).toBe('https://mitraku-dev.on-premise.mitrais-dev.com/dashboard')
  });
});