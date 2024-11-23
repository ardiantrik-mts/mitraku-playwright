import { Locator, Page } from '@playwright/test';
import { ProductPage } from './ProductPage';
import path from 'path';
import { ProductData } from '../../../interfaces/productData'

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
    readonly image2Field: Locator
    readonly isSaleSwitch: Locator
    readonly backButton: Locator
    readonly nextButton: Locator
    readonly saveButton: Locator

    constructor(page: Page) {
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
        this.image2Field = page.locator('//input[@name="image2"]')
        this.isSaleSwitch = page.locator('//input[@name="isSellable"]')
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

    async enterProductName(name: string){
        await this.nameField.fill(name)
    }

    async selectCategory(category: string){
        await this.categoryField.click()
        await this.page.waitForTimeout(2000)
        await this.categoryField.selectOption(category)
    }

    async selectType(type: string){
        await this.typeField.click()
        await this.page.waitForTimeout(2000)
        await this.typeField.selectOption(type)
    }

    async enterPrice(price: string){
        await this.priceField.fill(price)
    }

    async enterStock(stock: string){
        await this.stockField.fill(stock)
    }

    async selectUnit(unit: string){
        await this.unitField.click()
        await this.page.waitForTimeout(2000)
        await this.unitField.selectOption(unit)
    }

    async enterDescription(description: string){
        await this.descriptionField.fill(description)
    }

    async uploadImage1(image: string){
        const filePath = path.resolve(__dirname, '../../../tests-resources/'+image)
        await this.image1Field.setInputFiles(filePath)
    }

    async uploadImage2(image: string){
        const filePath = path.resolve(__dirname, '../../../tests-resources/'+image)
        await this.image2Field.setInputFiles(filePath)
    }

    async clickForSale(){
        await this.isSaleSwitch.check({ force: true })
    }

    async clickNextButton(){
        await this.nextButton.click()
    }

    async clickBackButton(){
        await this.backButton.click()
    }

    async clickSaveButton(){
        await this.saveButton.click()
    }

    async addProduct(productData: ProductData){
        //first page form
        await this.enterProductName(productData.name)
        await this.selectCategory(productData.category)
        await this.selectType(productData.type)
        await this.enterPrice(productData.price)
        await this.enterStock(productData.stock)
        await this.selectUnit(productData.unit)
        await this.clickNextButton()

        //second page form
        await this.enterDescription(productData.description)
        await this.uploadImage1(productData.image1)
        await this.clickForSale()
        await this.clickSaveButton()
    }

}