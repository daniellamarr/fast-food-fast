class Middleware {
    static validatePlaceOrder (req,res,next) {
        const {menu} = req.body;
        let place = [];
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].order=="" || menu[i].order==null) {
                return res.status(400).send({
                    status:"error",
                    message:"Please fill in your order"
                })
            }else if (menu[i].quantity=="" || menu[i].quantity==null) {
                return res.status(400).send({
                    status:"error",
                    message:"Please fill in your quantity"
                })
            }else if (menu[i].price=="" || menu[i].price==null) {
                return res.status(400).send({
                    status:"error",
                    message:"Please fill in your price"
                })
            }

            next();
        }
    }
}

export default Middleware;