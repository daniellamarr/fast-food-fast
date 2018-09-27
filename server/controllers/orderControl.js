import validate from "../helpers/validate"
import orders from "../model/orders";
import db from "../db";
import MenuQuery from "../queries/menuQuery";

class orderControl {
    static placeOrder(req,resp) {
        const { menu } = req.body
        return resp.status(201).send({
            status: 'success',
            message: 'Your order was placed successfully',
            orderid: req.itemid,
            order: menu
        })
    };

    static getAllOrders(req,resp) {
        return resp.send({
            status: 'success',
            message: 'Returning all orders',
            orders: orders
        });
    }

    static getOneOrder(req,resp) {
        return resp.send({
            status: 'success',
            message: 'Returned one order',
            order: req.order
        });
    }

    static updateOrderStatus(req,resp) {
        req.order.status = req.status;
        return resp.send({
            status: 'success',
            message: 'Order status has been changed',
            order: req.order
        });
    }
}

export default orderControl;