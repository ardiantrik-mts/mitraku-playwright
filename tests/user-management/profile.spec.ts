import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { faker } from '@faker-js/faker';
import { AccountPage } from '../../pages/manage-account-page/AccountPage';
import { SideBar } from '../../pages/SideBar';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateTo('https://mitraku-dev.on-premise.mitrais-dev.com/');
    await loginPage.login('mitraku-auto@yopmail.com', 'Qwe123!@#');
    await page.waitForURL('**/store')
});

test.describe('Manage Account Tests', () => {
  test('should edit profile infor successfully with valid data', async ({ page }) => {
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