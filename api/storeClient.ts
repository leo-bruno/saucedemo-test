export class StoreClient {
    constructor(private request) {}

    async getStoreInventory(){
        return this.request.get('/v2/store/inventory');
    }
    async createStore(body) {
        return this.request.post('/v2/store/order/', {data:body});
    }
    async deleteStore(id: number){
        const response = await this.request.delete(`/v2/store/order/${id}`);

        if (response.status() !== 200) {
            throw new Error(`Failed to delete order ${id}`);
        }

        return response;
    }

}
