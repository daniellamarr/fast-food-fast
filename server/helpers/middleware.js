import validate from "../helpers/validate";

class Middleware {
    static validatePlaceOrder (req,resp,next) {
        const {menu} = req.body;
        if (menu==null || menu.length == 0) {
            return resp.status(400).send({
                status:"error",
                message:"Your request object cannot be left empty"
            })
        }
        let place = [];
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].order=="" || menu[i].order==null) {
                return resp.status(400).send({
                    status:"error",
                    message:"Please fill in your order"
                })
            }else if (validate.hasWhiteSpace(menu[i].order)) {
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
        req.place = place;
        next();
    }
}

export default Middleware;