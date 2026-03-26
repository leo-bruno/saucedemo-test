import {InventoryPage} from "../../../pages/inventory-page";
import {LoginPage} from "../../../pages/login-page";
import {CommonPage} from "../../../pages/common-page";
import {CartPage} from "../../../pages/cart-page";
import {test, expect,} from '@playwright/test';

let loginPage;
let inventoryPage;
let commonPage;
let cartPage;

const standardUser = {username: 'standard_user', password: 'secret_sauce'}

test.describe("Shopping Cart test", () => {


    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        commonPage = new CommonPage(page);
        cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login(standardUser.username, standardUser.password);
    })

    test("@smoke @regression Add item to the shopping cart", async ({page}) => {

        await inventoryPage.clickOnAddButton(0);
        const expectedItem = await inventoryPage.getItemTitle(0);

        await expect(commonPage.getCartBadge(), "Wrong amount in the cart budge").toHaveText("1");

        await commonPage.clickOnShoppingCartLink();

        await expect(cartPage.getItemTitle(0), "Wrong item added to the shopping cart page").toHaveText(expectedItem);
        await expect(commonPage.getCartBadge(), "Cart badge is not shown").toBeVisible();
        await expect(commonPage.getCartBadge(), "Wrong amount in the cart budge").toHaveText("1");
    })

    test("Remove item in the shopping cart from inventory page", async ({page}) => {
        await inventoryPage.clickOnAddButton(0);
        const expectedFirstItem = await inventoryPage.getItemTitle(0);

        await inventoryPage.clickOnAddButton(1);
        const expectedSecondItem = await inventoryPage.getItemTitle(1);

        await expect(commonPage.getCartBadge(), "Wrong amount in the cart budge").toHaveText("2");

        await inventoryPage.clickOnAddButton(0);

        await expect(commonPage.getCartBadge(), "Wrong amount in the cart budge").toHaveText("1");

        await commonPage.clickOnShoppingCartLink();

        await expect(cartPage.getItemTitle(0), "The item was not removed as expected").not.toHaveText(expectedFirstItem);
        await expect(cartPage.getItemTitle(0), "The item was removed and was not expected").toHaveText(expectedSecondItem);
        await expect(commonPage.getCartBadge(), "Cart badge is not shown").toBeVisible();
        await expect(commonPage.getCartBadge(), "Wrong amount in the cart budge").toHaveText("1");

    })

    test("@smoke @regression Remove item in the shopping cart from cart page", async ({page}) => {
        await inventoryPage.clickOnAddButton(0);

        await inventoryPage.clickOnAddButton(1);

        await expect(commonPage.getCartBadge(), "Wrong amount in the cart budge").toHaveText("2");

        await commonPage.clickOnShoppingCartLink();

        await cartPage.clickOnAddButton(0);

        await expect(commonPage.getCartBadge(), "Wrong amount in the cart budge").toHaveText("1");

    })
})

test.describe("Persistence tests", () => {

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        commonPage = new CommonPage(page);

        await loginPage.goto();
        await loginPage.login(standardUser.username, standardUser.password);
    })

    test("@regression Items remain after log out", async ({page}) => {
        await inventoryPage.clickOnAddButton(0);
        await inventoryPage.clickOnAddButton(1);

        await commonPage.clickOnLogOutLink();

        await loginPage.login(standardUser.username, standardUser.password);

        await expect(commonPage.getCartBadge(), "Wrong amount in the cart budge").toHaveText("2");
    })

    test("@regression Items remain after refresh page", async ({page}) => {
        await inventoryPage.clickOnAddButton(0);
        await inventoryPage.clickOnAddButton(1);

        await page.reload();

        await expect(commonPage.getCartBadge(), "Wrong amount in the cart budge").toHaveText("2");
    })
})
