import {type Locator, type Page} from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator("div[data-test='inventory-item']")
    }


    getItemTitle(position: number) {
        return this.inventoryItems.nth(position).locator("div[data-test='inventory-item-name']").innerText();
    }

    async clickOnAddButton(position: number) {
        await this.inventoryItems.nth(position).locator('button').click();
    }

    getAddToCartButton(position: number) {
        return this.inventoryItems.nth(position).locator('button');
    }

}