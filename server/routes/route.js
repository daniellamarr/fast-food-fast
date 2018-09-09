import orderControl from "../controls/orderControl";

const Route = (app) => {

    app.post('/api/v1/orders', orderControl.placeOrder);
}

export default Route;