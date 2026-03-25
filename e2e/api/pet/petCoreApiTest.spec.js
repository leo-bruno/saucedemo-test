import {test, expect,} from '@playwright/test';
import {PetClient} from '../../../api/PetClient'

test.describe("Pet API - Core tests", () => {
    let response, responseBody;
    let client;
    let body;

    test.beforeEach("Create client", async ({request}) => {
        client = new PetClient(request)
    })

    test("POST: Should create a pet", async({request}) => {
        body= {"id": 123,"status": "available" }

        response = await client.createPet(body)
        responseBody = await response.json();

        expect(response.status()).toBe(200)
        expect(responseBody.id).toEqual(body.id)
        expect(responseBody.status).toContain(body.status)
    })

    test("GET: Should return pet using status", async({request}) => {
        const expectedStatus = "available";
        response = await client.getPetByStatus(expectedStatus);
        responseBody = await response.json();

        expect(response.status()).toBe(200)
        for(const pet of responseBody){
            expect(pet.status).toContain(expectedStatus)
        }
    })

    test("PUT: Should update pet", async ({request}) => {
        body= {"id": 123,"status": "available" }
        await client.createPet(body)

        const expectedBody= {"id": 123, "status": "offline"}
        response = await client.updatePet(expectedBody)
        responseBody = await response.json();

        expect(response.status()).toBe(200)
        expect(responseBody.status).toContain(expectedBody.status)
    })
})
