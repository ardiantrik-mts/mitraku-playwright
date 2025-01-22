import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class StorePage extends BasePage {
    readonly createStoreButton: Locator
    readonly editStoreButton: Locator
    readonly statusSwitch: Locator
    readonly statusAlert: Locator


    constructor(page: Page) {
        super(page)
        this.createStoreButton = page.locator('//p[text()="Create Store" or text()="Buat Toko"]/parent::a')
        this.editStoreButton = page.locator('//p[text()="Ubah Toko" or text()="Update Store"]/parent::button')
        this.statusSwitch = page.locator('//input[@id="is-store-active"]/following-sibling::span')
        this.statusAlert = page.locator('//div[text()="Store status updated." or text()="Status toko telah diperbarui."]')
    }

    async clickCreateStore(){
        await this.createStoreButton.click()
    }

    async clickEditStore(){
        await this.editStoreButton.click()
    }

    async clickStatusSwitch(){
        await this.statusSwitch.click()
    }
}