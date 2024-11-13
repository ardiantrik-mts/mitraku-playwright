import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { StorePage } from '../../pages/store-page/StorePage';
import { StoreForm } from '../../pages/store-page/StoreForm';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateTo('https://mitraku-dev.on-premise.mitrais-dev.com/');
    await loginPage.login('mitraku-auto@yopmail.com', 'Qwe123!@#');
    await page.waitForURL('**/store')
});

test.describe('Store Tests', () => {
  test('should edit store successfully with valid data', async ({ page }) => {
    const storePage = new StorePage(page)
    const storeForm = new StoreForm(page)

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
});