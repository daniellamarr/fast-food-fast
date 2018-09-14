import orderControl from '../controls/orderControl';

const Route = (app) => {
  app.get('/api/v1/orders', orderControl.getAllOrders);

  app.post('/api/v1/orders', orderControl.placeOrder);

  app.get('/api/v1/orders/:id', orderControl.getOneOrder);

  app.put('/api/v1/orders/:id', orderControl.updateOrderStatus);
};

export default Route;
