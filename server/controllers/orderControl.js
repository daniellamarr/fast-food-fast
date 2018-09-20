import validate from "../helpers/validate"
import orders from "../model/orders";

class orderControl {
    static placeOrder(req,resp) {
        let prices = []
        for (let j = 0; j < req.place.length; j++) {
            const sum = req.place[j].price * req.place[j].quantity;
            prices.push(sum);
        }
        const placeorder = {
            id: orders.length + 1,
            menu: req.place,
            total: validate.sumPrices(prices),
            status: "pending"
        };
        orders.push(placeorder);
        return resp.status(201).send({
            status: "success",
            message: "Order placed successfully",
            orders: placeorder
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