import {test, expect,} from '@playwright/test';
import {StoreClient} from '../../../api/storeClient'

test.describe("Store API - Core tests", () => {
    test("POST: Create store", async ({request}) => {
        const storeClient = new StoreClient(request);

        const body =
        {
            "id": 1,
            "petId": 0,
            "quantity": 0,
            "shipDate": "2026-03-24T15:49:02.143Z",
            "status": "placed",
            "complete": true
        }

        const resp = await storeClient.createStore(body)
        expect(resp.status()).toBe(200);

    })

    test("GET: Should return store inventory", async ({request}) => {
        const storeClient = new StoreClient(request);
        const  resp = await storeClient.getStoreInventory();
        expect(resp.status()).toBe(200);
    })

    test ("DELETE: Should delete a store", async ({request}) => {
        const storeClient = new StoreClient(request);
        let body;
        await storeClient.createStore(body =
            {
                "id": 1,
                "petId": 0,
                "quantity": 0,
                "shipDate": "2026-03-24T15:49:02.143Z",
                "status": "placed",
                "complete": true
            })
        const resp = await storeClient.deleteStore(1);
        expect(resp.status()).toBe(200)
    })
})