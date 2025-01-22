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
        this.dashboardButton = page.locator('//span[text()="Dashboard" or text()="Dasbor"]/ancestor::a')
        this.storeButton = page.locator('//span[text()="My Store" or text()="Toko Saya"]/ancestor::a')
        this.productButton = page.locator('//span[text()="Product List" or text()="Daftar Produk"]/ancestor::a')
        this.orderButton = page.locator('//span[text()="Order List" or text()="Daftar Pesanan"]/ancestor::a')
        this.accountButton = page.locator('//span[text()="Manage Account" or text()="Pengaturan"]/ancestor::a')
        this.logoutButton = page.locator('//span[text()="Log out" or text()="Keluar"]/ancestor::a')
    }

    async clickProductList(){
        await this.productButton.click()
    }

    async clickMyStore(){
        await this.storeButton.click()
    }

    async clickManageAccount(){
        await this.accountButton.click()
    }

    async clickLogout(){
        await this.logoutButton.click()
    }
}