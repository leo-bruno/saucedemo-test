import {test, expect,} from '@playwright/test';
import {PetClient} from '../../../api/petClient'

test.describe("Pet API - Core tests", () => {
    test("POST: Should create a pet", async({request}) => {
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

        const res = await client.createPet(body)
        expect(res.status()).toBe(200)

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