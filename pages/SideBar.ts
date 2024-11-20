import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SideBar extends BasePage {
    readonly dashboardButton: Locator
    readonly storeButton: Locator
    readonly productButton: Locator
    readonly orderButton: Locator
    readonly accountButton: Locator
    readonly logoutButton: Locator

    constructor(page: Page) {
        super(page)
        this.dashboardButton = page.locator('//span[text()="Dashboard"]/ancestor::a')
        this.storeButton = page.locator('//span[text()="My Store"]/ancestor::a')
        this.productButton = page.locator('//span[text()="Product List"]/ancestor::a')
        this.orderButton = page.locator('//span[text()="Order List"]/ancestor::a')
        this.accountButton = page.locator('//span[text()="Manage Account"]/ancestor::a')
        this.logoutButton = page.locator('//span[text()="Log out"]/ancestor::a')
    }

    async clickProductList(){
        await this.productButton.click()
    }

    async clickManageAccount(){
        await this.accountButton.click()
    }

    async clickLogout(){
        await this.logoutButton.click()
    }
}