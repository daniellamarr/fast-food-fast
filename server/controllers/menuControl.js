import db from "../db/index";
import MenuQuery from "../queries/menuQuery";

class MenuControl {
    static addMenu (req,resp) {
        const title = req.body.title;
        const quantity = req.body.quantity;
        const price = req.body.price;
        
        db.query(
            MenuQuery.addMenuQuery(title,quantity,price,req.tokenId),
            (err,res) => {
                const [menu] = res.rows;
                return resp.status(201).send({
                    status: 'success',
                    message: 'New Meal Inserted',
                    menu: {
                        id: menu.id,
                        title: menu.title,
                        price: menu.price,
                        admin: menu.adminid
                    }
                })
            }
        )
    }

    static getAllMenu (req,resp) {
        db.query(
            MenuQuery.getAllMenuQuery(),
            (err, res) => {
                let all = [];
                const menu = res.rows;
                if (menu=="") {
                    return resp.status(404).send({
                        status: 'error',
                        message: 'No Menu Found'
                    })
                }
                menu.forEach(obj => {
                    all.push({
                        id: obj.id,
                        title:obj.title,
                        price:obj.price,
                        quantity:obj.quantity,
                    })
                });
                return resp.status(200).send({
                    status: 'success',
                    message: 'Available Menu',
                    menu: all
                })
            }
        )
    }

    static getOneMenu(req,resp) {
        db.query(
            MenuQuery.getOneMenuIDQuery(req.params.id),
            (err, res) => {
                const [menu] = res.rows;
                if (menu=="" || menu==null) {
                    return resp.status(404).send({
                        status: 'error',
                        message: 'Menu Not Found'
                    })
                }
                return resp.status(200).send({
                    status: 'success',
                    message: 'Returned one menu',
                    menu: {
                        id: menu.id,
                        title: menu.title,
                        price: menu.price,
                        quantity: menu.quantity
                    }
                })
            }
        )
    }
}

export default MenuControl;