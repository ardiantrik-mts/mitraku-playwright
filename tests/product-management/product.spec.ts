import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { faker } from '@faker-js/faker';
import { AccountPage } from '../../pages/manage-account-page/AccountPage';
import { SideBar } from '../../pages/SideBar';
import { ProductPage } from '../../pages/product-page/ProductPage';
import { ProductForm } from '../../pages/product-page/ProductForm';
import { ProductData } from '../../interfaces/productData';
import { ProductDetail } from '../../pages/product-page/ProductDetail';

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

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateTo('https://mitraku-dev.on-premise.mitrais-dev.com/');
    await loginPage.login('mitraku-auto@yopmail.com', 'Qwe123!@#');
    await page.waitForURL('**/store')
});

test.describe.serial('Product Sceanrio Tests', () => {
  test('Should add product successfully with valid data', async ({ page }) => {
    const productPage = new ProductPage(page)
    const productForm = new ProductForm(page)
    const sidebar = new SideBar(page)

    await sidebar.clickProductList()
    await page.waitForURL('**/produk')
    await page.waitForTimeout(3000)
    await productPage.clickAddProduct()
    await productForm.addProduct(productData)
    console.log('Add-'+productData.name)
    await page.waitForTimeout(2000)
    expect(await page.locator('//p[text()="Product successfully added."]')).toBeVisible()
  });

  test('Should edit a product successfully with valid data', async ({ page }) => {
    const productPage = new ProductPage(page)
    const productForm = new ProductForm(page)
    const productDetail = new ProductDetail(page)
    const sidebar = new SideBar(page)

    await sidebar.clickProductList()
    await page.waitForURL('**/produk')
    await page.waitForTimeout(3000)
    await productPage.enterFindProduct(productData.name)
    console.log('Edit-'+productData.name)
    // await productPage.enterFindProduct("Product Name")
    await page.waitForTimeout(3000)
    await productPage.clickProductDetail()

    await productDetail.clickEditProduct()

    await productForm.enterPrice(faker.commerce.price({ min: 1000, max: 1000000, dec: 0 }))
    await productForm.enterStock("150")
    await productForm.clickNextButton()

    await productForm.enterDescription(faker.commerce.productDescription())
    await productForm.uploadImage2("test-image2.jpg")
    await productForm.clickSaveButton()
    
    await page.waitForTimeout(2000)
    expect(await page.locator('//p[text()="Product successfully updated."]')).toBeVisible()
  });

  test('Should delete a product successfully', async ({ page }) => {
    const productPage = new ProductPage(page)
    const sidebar = new SideBar(page)

    await sidebar.clickProductList()
    await page.waitForURL('**/produk')
    await page.waitForTimeout(3000)
    await productPage.enterFindProduct(productData.name)
    console.log('Delete-'+productData.name)
    // await productPage.enterFindProduct("Product Name")
    await page.waitForTimeout(3000)
    await productPage.clickMenuProduct()
    await productPage.clickDeleteProduct()
    await productPage.clickConfirmDelete()
    
    await page.waitForTimeout(2000)
    expect(await page.locator('//td[text()="Product Name"]').count()).toBe(0)
  });
});