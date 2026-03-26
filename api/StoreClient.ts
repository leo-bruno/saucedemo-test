export class StoreClient {
    constructor(private request) {}

    async createStore(body) {
        return await this.request.post('/v2/store/order/', {data:body});
    }
    async deleteStore(id: number){
        return await this.request.delete(`/v2/store/order/${id}`);
    }

}
