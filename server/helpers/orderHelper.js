import validate from "./validate";
import db from "../db";
import MenuQuery from "../queries/menuQuery";
import OrderQuery from "../queries/orderQuery";
import UserQuery from "../queries/userQuery";

class OrderHelper {
    static helpPlaceOrder (req,resp,next) {
        const { menu } = req.body;
        const status = 'new';

        let allorder = [];
        let neworder = [];
        for (let i = 0; i < menu.length; i++) {
            const { order, quantity } = menu[i];
            allorder.push(order);
            neworder.push({
                title: order,
                quantity: quantity
            });
        }
        db.query(
            MenuQuery.getAllMenuQuery())
        .then(res => {
            let allmenu = [];
            const retmenu = res.rows;
            retmenu.forEach(obj => {
                allmenu.push(obj.title);
            });
            const vlt = validate.arrayContainsArray(allmenu,allorder)
            if (vlt === false) {
                return resp.status(404).send({
                    status: 'error',
                    message: 'An item in your menu does not exist on this app'
                })
            }else{
                db.query(
                    OrderQuery.addOrderQuery(req.tokenId,status)
                )
                .then(ord => {
                    const [ ret ] = ord.rows;
                    const id = ret.id
                    let prices = [];
                    let queries = [];
                    for (let j = 0; j < menu.length; j++) {
                        const query = db.query(
                            MenuQuery.getOneMenuQuery(menu[j].order)
                        ).then(men => {
                            const [ rest ] = men.rows;
                            const mid = rest.id
                            const diff = rest.quantity - menu[j].quantity;
                            prices.push(rest.price * menu[j].quantity);
                            req.prices = prices

                            db.query(
                                OrderQuery.addOrderItemsQuery(id,rest.title,menu[j].quantity)
                            ).then(snd => {})
                            db.query(
                                MenuQuery.updateMenuQtyQuery(mid,diff)
                            ).then(snd => {})
                        })
                        queries.push(query);
                    }

                    Promise.all(queries).then(() => {
                        req.prices = prices;
                        req.itemid = id;
                        next();
                    });
                })
            }
        })
    }

    static helpAdminGetOrders (req,resp,next) {
        db.query(
            OrderQuery.getAllOrdersQuery())
        .then(res => {
            const order = res.rows;

            if (order=="" || order==null) {
                return resp.status(404).send({
                    status: 'error',
                    message: 'No order found'
                })
            }else{
                req.order = order;
                next();
            }
        })
    }

    static helpAdminGetOneOrder (req,resp,next) {
        db.query(
            OrderQuery.getOneOrderQuery(req.params.id))
        .then(res => {
            const order = res.rows;

            if (order=="" || order==null) {
                return resp.status(404).send({
                    status: 'error',
                    message: 'No order found'
                })
            }else{
                req.order = order;
                next();
            }
        })
    }

    static helpGetUserOrders (req,resp,next) {
        db.query(
            OrderQuery.getUserOrderQuery(req.id))
        .then(res => {
            const order = res.rows;

            if (order=="" || order==null) {
                return resp.status(404).send({
                    status: 'error',
                    message: 'No order found'
                })
            }else{
                req.order = order;
                next();
            }
        })
    }

    static helpGetOrderUser (req,resp,next) {
        const order = req.order;
        let queries = [];
        let user = [];
        order.forEach(obj => {
            const query = db.query(
                UserQuery.checkUserIDQuery(obj.userid))
            .then(res_ => {
                const userr = res_.rows;
                for (let i = 0; i < userr.length; i++) {
                   user.push({
                       name: userr[i].name,
                       email: userr[i].email,
                       phone: userr[i].phone
                   })
                }
            })
            queries.push(query);
        });
        Promise.all(queries).then(() => {
            req.user = user;
            next();
        });
    }

    static helpGetUserAndOrderItems (req,resp,next) {
        const order = req.order;
        const user = req.user;
        let queries = [];
        let items = [];
        for (let i = 0; i < order.length; i++){
            const query = db.query(
                OrderQuery.getUserItemsQuery(order[i].id))
            .then(res_ => {
                const item = res_.rows;
                
                items.push({
                    id: order[i].id,
                    price: order[i].amount,
                    status: order[i].status,
                    food: item,
                    user: user[i]
                });
            })
            queries.push(query);
        };
        Promise.all(queries).then(() => {
            req.orders = items;
            next();
        });
    }

    static helpGetOrderItems (req,resp,next) {
        const order = req.order;
        let queries = [];
        let items = [];
        order.forEach(obj => {
            const query = db.query(
                OrderQuery.getUserItemsQuery(obj.id))
            .then(res_ => {
                const item = res_.rows;
                
                items.push({
                    id: obj.id,
                    price: obj.amount,
                    status: obj.status,
                    food: item
                });
            })
            queries.push(query);
        });
        Promise.all(queries).then(() => {
            req.orders = items;
            next();
        });
    }
    
    static helpUpdateOrderStaus (req,resp,next) {
        db.query(
            OrderQuery.updateOrderStatus(req.params.id,req.status))
        .then(res => {
            const [ stat ] = res.rows;
            req.orders = {
                id: stat.id,
                status: stat.status
            }
            next();
        })
    }
}


export default OrderHelper;