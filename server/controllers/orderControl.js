import validate from "../helpers/validate"
import orders from "../model/orders";

class orderControl {
    static placeOrder(req,resp) {
        const {menu} = req.body;
        let place = [];
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].order=="" || menu[i].order==null) {
                return resp.status(400).send({
                    status:"error",
                    message:"Please fill in your order"
                })
            }else if (menu[i].quantity=="" || menu[i].quantity==null) {
                return resp.status(400).send({
                    status:"error",
                    message:"Please fill in your quantity"
                })
            }else if (menu[i].price=="" || menu[i].price==null) {
                return resp.status(400).send({
                    status:"error",
                    message:"Please fill in your price"
                })
            }else if (typeof(menu[i].quantity) != "number") {
                return resp.status(400).send({
                    status:"error",
                    message:"Quantity must be a number"
                })
            }else if (typeof(menu[i].price) != "number") {
                return resp.status(400).send({
                    status:"error",
                    message:"Price must be a number"
                })
            }
            place.push({
                id: i + 1,
                order: menu[i].order,
                quantity: menu[i].quantity,
                price: menu[i].price
            });
        }
        let prices = []
        for (let j = 0; j < place.length; j++) {
            const sum = place[j].price * place[j].quantity;
            prices.push(sum);
        }
        const placeorder = {
            id: orders.length + 1,
            menu: place,
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