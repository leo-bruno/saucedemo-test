import {test, expect,} from '@playwright/test';
import {StoreClient} from '../../../api-clients/StoreClient'

let response, responseBody;
let storeClient;
let body;

test.describe("Store API - POST tests",  () => {

    test.beforeEach("Create store client", async ({request}) => {
        storeClient = new StoreClient(request);
    })

    test("@smoke Create store", async ({request}) => {
        body = {"id": 1, "complete": true}

        response = await storeClient.createStore(body)
        responseBody = await response.json();

        expect(response.status(), "Status code is not 200").toBe(200);
        expect(responseBody.id, "Store id is not the expected one").toBe(body.id)
        expect(responseBody.complete, "Store complete is not true").toBeTruthy()
    })

    test("@regression Store should not be created", async ({request}) => {
        body = {"id": 1, "complete": "test"}
        response = await storeClient.createStore(body)
        responseBody = await response.json();

        expect(response.status(), "Status code is not 200").not.toBe(200);})
})

test.describe("Store API - DELETE tests", () => {

    test.beforeEach("Create store client", async ({request}) => {
        storeClient = new StoreClient(request);
    })

    test("@smoke Should delete a store", async ({request}) => {
        body = {"id": 1}

        await storeClient.createStore(body)
        response = await storeClient.deleteStore(body.id);
        responseBody = await response.json();

        expect(response.status(), "Status code is not 200").toBe(200)
        expect(responseBody.code).toBe(200)
        expect(responseBody.message, "Message different to the expected").toBe(body.id.toString())
    })

    test("@regression Should not delete a store twice", async({request}) => {
        body = {"id": 2}

        await storeClient.createStore(body)
        await storeClient.deleteStore(body.id);
        response = await storeClient.deleteStore(body.id);
        responseBody = await response.json();

        expect(response.status(), "Status code is not 200").not.toBe(200)
        expect(responseBody.code).toBe(404)
        expect(responseBody.message, "Message different to the store id deleted").toContain("Order Not Found")
    })
})