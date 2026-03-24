import {type Locator, type Page} from "@playwright/test";

export class  CartPage {
    readonly page: Page;
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator("div[data-test='inventory-item']")
    }

    getItemTitle(position: number){
        return this.inventoryItems.nth(position).locator("[data-test='inventory-item-name']");
    }

    async clickOnAddButton(position: number) {
        await this.inventoryItems.nth(position).locator('button').click();
    }
}