import validate from '../helpers/validate';
import orders from '../data/orders';

class orderControl {
  static placeOrder(req, resp) {
    const ord1 = req.body.order;
    const ord2 = ord1.split(',');

    const qty1 = req.body.quantity;
    const qty2 = qty1.split(',');

    const qCheck = qty2.every(validate.checkValidity);
    const oCheck = ord2.every(validate.checkValidity);
    if (qCheck != true || oCheck != true) {
      resp.status(400).send({
        status: 'Error',
        message: 'Fields cannot be left empty',
      });
    } else if (qty2.length != ord2.length) {
      let res;
      let num;
      if (qty2.length < ord2.length) {
        num = ord2.length - qty2.length;
        res = `Sorry, you have not added quantity for ${num} order(s)`;
      } else if (qty2.length > ord2.length) {
        num = qty2.length - ord2.length;
        res = `Sorry, you have added ${num} invalid quantity(ies)`;
      }
      resp.status(400).send({
        status: 'Error',
        message: res,
      });
    } else {
      const order = {
        id: orders.length + 1,
        order: ord2,
        quantity: qty2,
        status: false,
      };
      orders.push(order);
      resp.send({
        status: 'success',
        message: 'New order inserted',
        order,
      });
    }
  }

  static getAllOrders(req, resp) {
    resp.send({
      status: 'success',
      message: 'Returning all orders',
      orders,
    });
  }

  static getOneOrder(req, resp) {
    const order = orders.find(c => c.id === parseInt(req.params.id));
    if (!order) {
      resp.status(404).send({
        status: 'error',
        message: 'This order was not found on the list',
      });
    } else {
      resp.send({
        status: 'success',
        message: 'Returning 1 order',
        order,
      });
    }
  }

  static updateOrderStatus(req, resp) {
    const order = orders.find(c => c.id === parseInt(req.params.id));
    if (!order) {
      resp.status(404).send({
        status: 'error',
        message: 'This order was not found on the list',
      });
    }
    let stat = order.status;
    if (stat === false) {
      stat = true;
    } else if (stat === true) {
      stat = false;
    }
    order.status = stat;
    resp.send({
      status: 'success',
      message: 'Order status has been changed',
      order,
    });
  }
}

export default orderControl;
