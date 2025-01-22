import { test, expect } from '@playwright/test';
import { AccountPage } from '../../pages/manage-account-page/AccountPage';
import { SideBar } from '../../pages/SideBar';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../../pages/LoginPage';
import { testData } from '../../utils/testData';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateTo('https://mitraku-dev.on-premise.mitrais-dev.com/');
    await loginPage.login(testData.usersCollection.validUser.email, testData.usersCollection.validUser.password);
    await page.waitForURL('**/dashboard')
});

test.describe('Manage Account Scenario Tests', () => {
  test('Should edit profile infor successfully with valid data', async ({ page }) => {
    const accountPage = new AccountPage(page)
    const sidebar = new SideBar(page)

    await sidebar.clickManageAccount()
    await page.waitForURL('**/account')
    await accountPage.enterAddress(faker.location.streetAddress({ useFullAddress: true }))
    await accountPage.clickSaveChanges()
    await page.waitForTimeout(2000)
    expect(await page.locator('//div[@data-status="success" and text()="Account information successfully updated."]')).toBeVisible()
  });
});