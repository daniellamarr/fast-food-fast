import orderControl from "../controls/orderControl";

const Route = (app) => {

    app.get('/api/v1/orders', orderControl.getAllOrders);

    app.post('/api/v1/orders', orderControl.placeOrder);
}

export default Route;