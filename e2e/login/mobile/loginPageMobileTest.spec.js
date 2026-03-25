import {test, expect,} from '@playwright/test';
import {LoginPage} from "../../../pages/login-page";
import {InventoryPage} from "../../../pages/inventory-page";
import {CommonPage} from "../../../pages/common-page";


test.describe('Login functionality', () => {

    let loginPage;
    let inventoryPage;
    let commonPage;

    const standardUser = { username:'standard_user',password:'secret_sauce'}
    const lockedUser ={ username: 'locked_out_user', password: 'secret_sauce'}
    const problemUser = { username: 'problem_user', password: 'secret_sauce'}

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        inventoryPage = new InventoryPage(page)
        commonPage = new CommonPage(page)

        await loginPage.goto()
    })
    test('@smoke @regression Successful login',  async ({page})=> {
        await loginPage.login(standardUser.username, standardUser.password)

        await expect(page, "The user has navigated to a different url").toHaveURL(/.*\/inventory\.html/)
        await expect ((await inventoryPage.inventoryItems.count()).valueOf(), "Inventory empty in the inventory page").toBeGreaterThan(0);
    })

    test('@smoke @regression Successful logout',  async ({page})=> {
        await loginPage.login(standardUser.username, standardUser.password)

        await commonPage.clickOnLogOutLink();

        await expect(loginPage.loginButton, "Login button is not shown").toBeVisible();
        await expect(page, "The user has navigated to a different url").toHaveURL('https://www.saucedemo.com/');
    })

    test("@regression Error login - wrong password", async({page}) => {
        await loginPage.login(lockedUser.username, "password123")
        await expect (loginPage.errorMessageContainer, "Message is not shown").toBeVisible();
        await expect (loginPage.errorMessageContainer, "Message shown is wrong").toHaveText("Epic sadface: Username and password do not match any user in this service")
    })

    test("@regression Error login - wrong username", async({page}) => {
        await loginPage.login("userTest", standardUser.password)
        await expect (loginPage.errorMessageContainer, "Message is not shown").toBeVisible();
        await expect (loginPage.errorMessageContainer, "Message shown is wrong").toHaveText("Epic sadface: Username and password do not match any user in this service")
    })

    test("@regression Error login - empty username and password", async({page}) => {
        await loginPage.login("", "")
        await expect (loginPage.errorMessageContainer, "Message is not shown").toBeVisible();
        await expect (loginPage.errorMessageContainer, "Message shown is wrong").toHaveText("Epic sadface: Username is required")
    })

    test('Locked User', async ({page}) => {
        await loginPage.login(lockedUser.username, lockedUser.password)
        await expect (loginPage.errorMessageContainer, "Message is not shown").toBeVisible();
        await expect (loginPage.errorMessageContainer, "Message shown is wrong").toHaveText("Epic sadface: Sorry, this user has been locked out.")
    })

    test.skip('Button text should change after clicking (skipped due to TASK-123)', async({page}) =>{
        await loginPage.login(problemUser.username, problemUser.password)
        const button = inventoryPage.getAddToCartButton(0);

        await expect(button, "The button text was expected to change").toHaveText('Add to cart');
        await button.click();
        await expect(button, "The button text was expected to change").toHaveText('Remove');
        await button.click();
        await expect(button, "The button text was expected to change").toHaveText('Add to cart');
    })

})
