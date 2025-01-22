import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { StorePage } from '../../pages/store-page/StorePage';
import { StoreForm } from '../../pages/store-page/StoreForm';
import { faker } from '@faker-js/faker';
import { testData } from '../../utils/testData';
import { SideBar } from '../../pages/SideBar';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateTo('https://mitraku-dev.on-premise.mitrais-dev.com/');
    await loginPage.login(testData.usersCollection.validUser.email, testData.usersCollection.validUser.password);
    await page.waitForURL('**/dashboard')
});

test.describe('Store Scenario Tests', () => {
  test('Should edit store successfully with valid data', async ({ page }) => {
    const storePage = new StorePage(page)
    const storeForm = new StoreForm(page)
    const sidebar = new SideBar(page)

    await sidebar.clickMyStore()
    await storePage.clickEditStore()
    await page.waitForURL('**/store/edit')
    await storeForm.enterStoreDescription(faker.lorem.lines(3))
    await storeForm.clickNextButton()
    await storeForm.clickNextButton()
    await storeForm.clickUpdateButton()
    await page.waitForTimeout(3000)
    expect(await page.locator('//img[@alt="Kelola Toko"]')).toBeVisible()
    // expect(await page.url()).toBe('https://mitraku-dev.on-premise.mitrais-dev.com/store/edit')
  });

  test('Should edit store status successfully', async ({ page }) => {
    const storePage = new StorePage(page)
    const storeForm = new StoreForm(page)
    const sidebar = new SideBar(page)

    await sidebar.clickMyStore()
    await storePage.clickStatusSwitch()
    await page.waitForTimeout(1000)
    expect(await page.locator('//div[text()="Store status updated." or text()="Status toko telah diperbarui."]')).toBeVisible()
    // expect(await page.url()).toBe('https://mitraku-dev.on-premise.mitrais-dev.com/store/edit')
  });
});