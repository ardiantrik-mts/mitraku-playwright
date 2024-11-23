import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly myStoreNavbar: Locator

  constructor(page: Page) {
    this.page = page;
    this.myStoreNavbar = page.locator('//span[text()="My Store"]/ancestor::a')
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForElement(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
  }
}
