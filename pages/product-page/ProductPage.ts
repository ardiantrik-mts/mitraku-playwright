import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ProductPage extends BasePage {
    readonly addProductButton: Locator
    readonly findProductField: Locator
    readonly categoryDropdown: Locator
    readonly categoryCheckbox: Locator


    constructor(page: Page) {
        super(page)
        this.addProductButton = page.locator('//p[text()="Add Product" or text()="Tambah Produk"]/ancestor::a')
        this.findProductField = page.locator('//input[@placeholder="Find Product"]')
    }

    async clickAddProduct(){
        await this.addProductButton.click()
    }

    async enterFindProduct(product: string){
        await this.findProductField.fill(product)
    }
}