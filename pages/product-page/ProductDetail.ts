import { Locator, Page } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class ProductDetail extends ProductPage {
    readonly productListButton: Locator
    readonly editProductButton: Locator

    constructor(page: Page) {
        super(page)
        this.productListButton = page.locator('//p[text()="Product List"]/ancestor::a')
        this.editProductButton = page.locator('//p[text()="Edit Product"]/ancestor::a')
    }

    async clickProductList(){
        await this.productListButton.click()
    }

    async clickEditProduct(){
        await this.editProductButton.click()
    }
}