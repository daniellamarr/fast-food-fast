import validate from "../helpers/validate"
import orders from "../model/orders";
import db from "../db";
import OrderQuery from "../queries/orderQuery";

class orderControl {
    static placeOrder(req,resp) {
        const { menu } = req.body
        const total = validate.sumPrices(req.prices);
        db.query(
            OrderQuery.updateAmountQuery(req.itemid,total),
            ((err,res)=>{
                const [ respon ] = res.rows;
                const responses = {
                    orderid: respon.id,
                    amount: respon.amount,
                }
                return resp.status(201).send({
                    status: 'success',
                    message: 'Your order was placed successfully',
                    order: menu,
                    orderdetails: responses
                })
            })
        )
    };

    static getAllOrders(req,resp) {
        return resp.send({
            status: 'success',
            message: 'Returning all orders',
            orders: req.orders
        });
    }

    static getOneOrder(req,resp) {
        return resp.send({
            status: 'success',
            message: 'Returned one order',
            order: req.orders
        });
    }

    static getUserOrders(req,resp) {
        return resp.status(200).send({
            status: 'success',
            message: 'Orders returned successfully',
            order: req.orders
        })
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