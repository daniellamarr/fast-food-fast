import validate from "./validate";
import db from "../db";
import MenuQuery from "../queries/menuQuery";
import OrderQuery from "../queries/orderQuery";

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
                                OrderQuery.addOrderItemsQuery(id,mid,menu[j].quantity)
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
}


export default OrderHelper;