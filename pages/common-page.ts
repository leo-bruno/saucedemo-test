import {type Locator, type Page} from "@playwright/test";

export class CommonPage {
    readonly page: Page;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly burgerMenu: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartLink = page.locator("a[data-test='shopping-cart-link']")
        this.shoppingCartBadge = page.locator("span[data-test='shopping-cart-badge']")
        this.burgerMenu = page.locator("div.bm-burger-button")
        this.logoutButton = page.locator("a[data-test='logout-sidebar-link']")
    }

    getCartBadge() {
        return this.shoppingCartBadge;
    }

    async clickOnShoppingCartLink() {
        return this.shoppingCartLink.click();
    }

    async clickOnLogOutLink() {
        await this.burgerMenu.locator('button').click();
        await this.logoutButton.click();
    }
}