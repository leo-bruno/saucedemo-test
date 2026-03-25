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
        const client = new PetClient(request)
        const res = await client.getPetByStatus("available");
        expect(res.status()).toBe(200)
    })

    test("PUT: Should update pet", async ({request}) => {
        const client = new PetClient(request)

        const body =
            {
                "id": 0,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": "doggie",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "available"
            }

        const res = await client.updatePet(body)
        expect(res.status()).toBe(200)
    })
})