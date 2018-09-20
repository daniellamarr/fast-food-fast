import validate from "../helpers/validate";
import orders from "../model/orders";

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

    static validateGetOneOrder (req,resp,next) {
        const order = orders.find(c => c.id == req.params.id);
        if (!order) {
            return resp.status(404).send({
                status: 'error',
                message: 'This order was not found on the list'
            });
        }
        req.order = order;

        next();
    }

    static validateUpdateOrderStatus (req,resp,next) {
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
        
        req.status = status;
        req.order = order;
        
        next();
    }
}

export default Middleware;