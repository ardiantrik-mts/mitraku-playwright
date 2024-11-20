import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { faker } from '@faker-js/faker';
import { AccountPage } from '../../pages/manage-account-page/AccountPage';
import { SideBar } from '../../pages/SideBar';
import { ProductPage } from '../../pages/product-page/ProductPage';
import { ProductForm } from '../../pages/product-page/ProductForm';
import { ProductData } from '../../interfaces/productData';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateTo('https://mitraku-dev.on-premise.mitrais-dev.com/');
    await loginPage.login('mitraku-auto@yopmail.com', 'Qwe123!@#');
    await page.waitForURL('**/store')
});

test.describe('Manage Account Tests', () => {
  test('should edit profile infor successfully with valid data', async ({ page }) => {
    const accountPage = new AccountPage(page)
    const productPage = new ProductPage(page)
    const productForm = new ProductForm(page)
    const sidebar = new SideBar(page)

    const productData: ProductData = {
      name: faker.commerce.productName(),
      category: "70",
      type: "71",
      price: faker.commerce.price({ min: 1000, max: 1000000, dec: 0 }),
      stock: "100",
      unit: "pieces",
      description: faker.commerce.productDescription(),
      image1: "test-image1.jpg"
    }

    await sidebar.clickProductList()
    await page.waitForURL('**/produk')
    await page.waitForTimeout(3000)
    await productPage.clickAddProduct()
    await productForm.addProduct(productData)
    await page.waitForTimeout(2000)
    expect(await page.locator('//p[text()="Product successfully added."]')).toBeVisible()
  });
});