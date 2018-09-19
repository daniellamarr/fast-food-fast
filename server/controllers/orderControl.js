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
        resp.status(201).send({
            status: "success",
            message: "Order placed successfully",
            orders: placeorder
        })
    };

    static getAllOrders(req,resp) {
        resp.send({
            status: 'success',
            message: 'Returning all orders',
            orders: orders
        });
    }

    static getOneOrder(req,resp) {
        const order = orders.find(c => c.id === parseInt(req.params.id));
        if (!order) {
            resp.status(404).send({
                status: 'error',
                message: 'This order was not found on the list'
            });
        }else{
            resp.send({
                status: 'success',
                message: 'Returning 1 order',
                order: order
            });
        }
    }

    static updateOrderStatus(req,resp) {
        const order = orders.find(c => c.id === parseInt(req.params.id));
        if (!order) resp.status(404).send({
            status: 'error',
            message: 'This order was not found on the list'
        });
        let stat = order.status;
        if (stat===false) {
            stat = true;
        }else if (stat===true) {
            stat = false;
        }
        order.status = stat;
        resp.send({
            status: 'success',
            message: 'Order status has been changed',
            order: order
        });
    }
}

export default orderControl;