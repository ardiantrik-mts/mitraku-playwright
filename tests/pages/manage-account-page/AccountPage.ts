import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class AccountPage extends BasePage {
    readonly nameField: Locator
    readonly phoneField: Locator
    readonly addressField: Locator
    readonly saveButton: Locator
    readonly successToast: Locator

    constructor(page: Page) {
        super(page)
        this.nameField = page.locator('//input[@name="name"]')
        this.phoneField = page.locator('//input[@name="phone"]')
        this.addressField = page.locator('//input[@name="address"]')
        this.saveButton = page.locator('//button[text()="Save Changes"]')
        this.successToast = page.locator('//div[@data-status="success" and text()="Account information successfully updated."]')
    }

    async enterName(name: string){
        await this.nameField.click();
        await this.nameField.fill(name);
    }

    async enterPhoneNumber(phoneNumber: string){
        await this.phoneField.click();
        await this.phoneField.fill(phoneNumber);
    }

    async enterAddress(address: string){
        await this.addressField.click();
        await this.addressField.fill(address);
    }

    async clickSaveChanges(){
        await this.saveButton.click()
    }
}