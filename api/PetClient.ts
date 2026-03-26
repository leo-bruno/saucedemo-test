export class PetClient {
    constructor(private request) {}

    async createPet(pet){
        return await this.request.post('/v2/pet/', {data:pet});
    }

    async getPetByStatus(status) {
        return await this.request.get(`/v2/pet/findByStatus?status=${status}`);
    }

    async getPetById(petId) {
        return await this.request.get(`/v2/pet/${petId}`);
    }
}