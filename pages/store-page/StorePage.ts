import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class StorePage extends BasePage {
    readonly createStoreButton: Locator
    readonly editStoreButton: Locator


    constructor(page: Page) {
        super(page)
        this.createStoreButton = page.locator('//p[text()="Create Store"]/parent::a')
        this.editStoreButton = page.locator('//p[text()="Ubah Toko"]/parent::button')
    }

    async clickCreateStore(){
        await this.createStoreButton.click()
    }

    async clickEditStore(){
        await this.editStoreButton.click()
    }
}