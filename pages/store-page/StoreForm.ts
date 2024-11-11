import { Locator, Page } from '@playwright/test';
import { StorePage } from './StorePage';

export class StoreForm extends StorePage {
    readonly myStoreButton: Locator
    readonly nameField: Locator
    readonly phoneField: Locator
    readonly addressField: Locator
    readonly descriptionField: Locator
    readonly backButton: Locator
    readonly nextButton: Locator


    constructor(page: Page) {
        super(page)
        this.myStoreButton = page.locator('//p[text()="Toko Anda"]/ancestor::a')
        this.nameField = page.locator('//input[@name="name"]')
        this.phoneField = page.locator('//input[@name="phoneNumber"]')
        this.addressField = page.locator('//input[@name="address"]')
        this.descriptionField = page.locator('//input[@name="address"]')
        this.backButton = page.locator('//button[text()="Kembali"]')
        this.nextButton = page.locator('//button[text()="Berikutnya"]')
    }

    async clickMyStoreButton(){
        await this.myStoreButton.click()
    }

    async enterStoreName(name: string){
        await this.nameField.fill(name)
    }

    async enterStorePhone(phoneNumber: string){
        await this.phoneField.fill(phoneNumber)
    }

    async enterStoreAddress(address: string){
        await this.addressField.fill(address)
    }

    async enterStoreDescription(description: string){
        await this.descriptionField.fill(description)
    }

    async clickBackButton(){
        await this.backButton.click()
    }

    async clickNextButton(){
        await this.nextButton.click()
    }

}