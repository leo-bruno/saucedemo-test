export class StoreClient {
    constructor(private request) {}

    async getStoreInventory(){
        return await this.request.get('/v2/store/inventory');
    }
    async createStore(body) {
        return await this.request.post('/v2/store/order/', {data:body});
    }
    async deleteStore(id: number){
        return await this.request.delete(`/v2/store/order/${id}`);
    }

}
