import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        super(page)
        this.emailField = page.getByTestId('email')
        this.passwordField = page.getByTestId('password')
        this.loginButton = page.locator('//button[@data-testid="button-login"]')
    }

    async enterEmail(email: string){
        await this.emailField.click();
        await this.emailField.fill(email);
    }

    async enterPassword(password: string){
        await this.passwordField.click();
        await this.passwordField.fill(password);
    }

    async clickLogin(){
        await this.loginButton.click()
    }

    async login(email: string, password: string){
        await this.enterEmail(email)
        await this.enterPassword(password)
        await this.clickLogin()
    }
}