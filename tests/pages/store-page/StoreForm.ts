import { Locator, Page } from '@playwright/test';
import { StorePage } from './StorePage';

export class StoreForm extends StorePage {
    readonly myStoreButton: Locator
    readonly nameField: Locator
    readonly phoneField: Locator
    readonly addressField: Locator
    readonly descriptionField: Locator
    readonly addButton: Locator
    readonly backButton: Locator
    readonly nextButton: Locator
    readonly updateButton: Locator


    constructor(page: Page) {
        super(page)
        this.myStoreButton = page.locator('//p[text()="Toko Anda"]/ancestor::a')
        this.nameField = page.locator('//input[@name="name"]')
        this.phoneField = page.locator('//input[@name="phoneNumber"]')
        this.addressField = page.locator('//input[@name="address"]')
        this.descriptionField = page.locator('//textarea[@name="description"]')
        this.addButton = page.locator('//button[text()="Create Store" or text()="Buat Toko"]')
        this.backButton = page.locator('//button[text()="Back" or text()="Kembali"]')
        this.nextButton = page.locator('//button[text()="Next" or text()="Berikutnya"]')
        this.updateButton = page.locator('//button[text()="Ubah Toko" or text()="Update Store"]')
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

    async clickUpdateButton(){
        await this.updateButton.click()
    }

}