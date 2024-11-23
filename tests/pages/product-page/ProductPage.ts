import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ProductPage extends BasePage {
    readonly addProductButton: Locator
    readonly findProductField: Locator
    readonly categoryDropdown: Locator
    readonly categoryCheckbox: Locator
    readonly productDetailButton: Locator
    readonly productMenuButton: Locator
    readonly editProductButton: Locator
    readonly deleteProductButton: Locator
    readonly confirmRemoveButton: Locator


    constructor(page: Page) {
        super(page)
        this.addProductButton = page.locator('//p[text()="Add Product" or text()="Tambah Produk"]/ancestor::a')
        this.findProductField = page.locator('//input[@placeholder="Find Product"]')
        this.productDetailButton = page.locator('//p[text()="View Details"]/ancestor::a')
        this.productMenuButton = page.locator('//button[contains(@id,"headlessui-menu-button")]')
        this.editProductButton = page.locator('//span[text()="Edit"]/ancestor::a')
        this.deleteProductButton = page.locator('//span[text()="Remove"]/ancestor::a')
        this.confirmRemoveButton = page.locator('//button[text()="Remove"]')
    }

    async clickAddProduct(){
        await this.addProductButton.click()
    }

    async clickProductDetail(){
        await this.productDetailButton.click()
    }

    async enterFindProduct(product: string){
        await this.findProductField.fill(product)
    }

    async clickMenuProduct(){
        await this.productMenuButton.click()
    }

    async clickEditProduct(){
        await this.editProductButton.click()
    }

    async clickDeleteProduct(){
        await this.deleteProductButton.click()
    }

    async clickConfirmDelete(){
        await this.confirmRemoveButton.click()
    }
}