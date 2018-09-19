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
        const order = orders.find(c => c.id == req.params.id);
        if (!order) {
            return resp.status(404).send({
                status: 'error',
                message: 'This order was not found on the list'
            });
        }else{
            return resp.send({
                status: 'success',
                message: 'Returned one order',
                order: order
            });
        }
    }

    static updateOrderStatus(req,resp) {
        const status = req.body.status;
        const statusArray = ['pending','accepted','rejected','completed'];
        const order = orders.find(c => c.id == req.params.id);
        if (!order) {
            return resp.status(404).send({
                status: 'error',
                message: 'This order was not found on the list'
            });
        }
        if (status==="" || status==null){
            return resp.status(400).send({
                status: 'error',
                message: 'Status field cannot be left empty'
            });
        }else if (validate.hasWhiteSpace(status) != false) {
            return resp.status(400).send({
                status: 'error',
                message: 'No whitespaces allowed'
            });
        }else if (statusArray.includes(status) != true) {
            return resp.status(400).send({
                status: 'error',
                message: 'The status you entered is invalid'
            });
        }
        order.status = status;
        return resp.send({
            status: 'success',
            message: 'Order status has been changed',
            order: order
        });
    }
}

export default orderControl;