import {test, expect,} from '@playwright/test';
import {StoreClient} from '../../../api/StoreClient'

test.describe("Store API - Core tests", () => {
    let response, responseBody;
    let storeClient;
    let body;
    
    test.beforeEach("Create store", async({request}) => {
        storeClient = new StoreClient(request);
    })

    test("POST: Create store", async ({request}) => {
        body = {"id": 1,"complete": true}

        response = await storeClient.createStore(body)
        responseBody = await response.json();

        expect(response.status(), "Status code is not 200").toBe(200);
        expect(responseBody.id, "Store id is not the expected one").toBe(body.id)
        expect(responseBody.complete, "Store complete is not true").toBeTruthy()
    })

    test("GET: Should return store inventory", async ({request}) => {
        storeClient = new StoreClient(request);
        response = await storeClient.getStoreInventory();
        responseBody = await response.json();

        expect(response.status(), "Status code is not 200").toBe(200);
        for (const [status, count] of Object.entries(responseBody)) {
            expect(count, "Error: Inventory amount can not be less than zero").toBeGreaterThan(-1)
            expect(typeof status, "Error: Status code can not be something different to a string").toBe("string")
        }
    })

    test ("DELETE: Should delete a store", async ({request}) => {
        body = {"id": 1}

        await storeClient.createStore(body)
        response = await storeClient.deleteStore(body.id);
        responseBody = await response.json();

        expect(response.status(), "Status code is not 200").toBe(200)
        expect(responseBody.code).toBe(200)
        expect(responseBody.message, "Error: Message different to the store id deleted").toBe(body.id.toString())
    })
})