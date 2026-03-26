import {test, expect,} from '@playwright/test';
import {PetClient} from '../../../api-clients/PetClient';

let response, responseBody;
let client;
let body;

test.describe("Pet API - POST tests", () => {

    test.beforeEach("Create pet client", async ({request}) => {
        client = new PetClient(request);
    });

    test("@smoke Should create a pet", async ({request}) => {
        body = {"id": 123, "status": "available"};

        response = await client.createPet(body);
        responseBody = await response.json();

        expect(response.status(), "Status code is not 200").toBe(200);
        expect(responseBody.id, "Pet id is not the expected one").toEqual(body.id);
        expect(responseBody.status, "Pet status is not the expected one").toContain(body.status);
    });

    test("@regression Should not create a pet", async ({request}) => {
        body = {"id": "test", "status": "available"};

        response = await client.createPet(body);

        expect(response.status(), "The pet was created when it should not be").not.toBe(200);
    });
});

test.describe("Pet API - GET tests", () => {

    test.beforeEach("Create pet client", async ({request}) => {
        client = new PetClient(request);
    });

    test("@regression Should return pet using status", async({request}) => {
        const expectedStatus = "available";
        response = await client.getPetByStatus(expectedStatus);
        responseBody = await response.json();

        expect(response.status(), "Status code is not 200").toBe(200);
        for(const pet of responseBody){
            expect(pet.status, "Pet status is not the expected one").toContain(expectedStatus);
        };
    });

    test("@regression Should return pet using id", async ({request}) => {
        body= {"id": 123, "status": "available" };
        await client.createPet(body);

        response = await client.getPetById(body.id);
        responseBody = await response.json();

        expect(response.status(), "Status code is not 200").toBe(200);
        expect(responseBody.status, "Pet status is not the expected one").toBe(body.status);
        expect(responseBody.id, "Pet id is not the expected one").toBe(body.id);
    });
});
