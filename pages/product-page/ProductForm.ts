import { Locator, Page } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class ProductForm extends ProductPage {
    readonly productListButton: Locator
    readonly nameField: Locator
    readonly categoryField: Locator
    readonly typeField: Locator
    readonly priceField: Locator
    readonly stockField: Locator
    readonly unitField: Locator
    readonly descriptionField: Locator
    readonly image1Field: Locator
    readonly isSaleSwitch: Locator
    readonly backButton: Locator
    readonly nextButton: Locator
    readonly saveButton: Locator


    constructor(page: Page, element: string) {
        super(page)
        this.productListButton = page.locator('//p[text()="Product List"]/ancestor::a')
        this.nameField = page.locator('//input[@name="name"]')
        this.categoryField = page.locator('//select[@data-testid="category-dropdown"]')
        this.typeField = page.locator('//select[@data-testid="type-dropdown"]')
        this.priceField = page.locator('//input[@name="price"]')
        this.stockField = page.locator('//input[@name="stock"]')
        this.unitField = page.locator('//select[@name="uom"]')
        this.descriptionField = page.locator('//textarea[@name="description"]')
        this.image1Field = page.locator('//input[@name="image1"]')
        this.isSaleSwitch = page.locator('//input[@id="isSellable"]')
        this.backButton = page.locator('//button[text()="Back"]')
        this.nextButton = page.locator('//button[text()="Next"]')
        this.saveButton = page.locator('//button[text()="Save"]')
    }

    dropdownOption(value: string): Locator {
        return this.page.locator('//option[text()="'+value+'"]')
    }

    async clickProductList(){
        await this.productListButton.click()
    }

    async enterStoreName(name: string){
        await this.nameField.fill(name)
    }

    async selectCategory(category: string){
        await this.categoryField.click()
        await this.dropdownOption(category).click()
    }

    async selectType(type: string){
        await this.typeField.click()
        await this.dropdownOption(type).click()
    }

    async enterPrice(name: string){
        await this.priceField.fill(name)
    }

    async enterStock(name: string){
        await this.stockField.fill(name)
    }

    async selectUnit(unit: string){
        await this.unitField.click()
        await this.dropdownOption(unit).click()
    }

    async clickBackButton(){
        await this.backButton.click()
    }

}