import {expect, type Locator, type Page} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessageContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.locator("input[data-test='username']")
        this.passwordInput = page.locator("input[data-test='password']")
        this.loginButton = page.locator("input[data-test='login-button']")
        this.errorMessageContainer = page.locator("h3[data-test='error']")
    }

    async goto() {
        await this.page.goto('/')
    }

    async login(username: string, password: string){
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}