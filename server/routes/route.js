import orderControl from "../controllers/orderControl";
import Middleware from "../helpers/middleware";

const Route = (app) => {

    app.get('/api/v1/orders', orderControl.getAllOrders);

    app.post('/api/v1/orders', Middleware.validatePlaceOrder, orderControl.placeOrder);

    app.get('/api/v1/orders/:id', Middleware.validateGetOneOrder, orderControl.getOneOrder);

    app.put('/api/v1/orders/:id', Middleware.validateUpdateOrderStatus, orderControl.updateOrderStatus);
}

export default Route;