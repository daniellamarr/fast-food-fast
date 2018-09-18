import orderControl from "../controllers/orderControl";
// import Middleware from "../helpers/middleware";

const Route = (app) => {

    app.get('/api/v1/orders', orderControl.getAllOrders);

    app.post('/api/v1/orders', orderControl.placeOrder);

    app.get('/api/v1/orders/:id', orderControl.getOneOrder);

    app.put('/api/v1/orders/:id', orderControl.updateOrderStatus);
}

export default Route;