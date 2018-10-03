import db from "../db/index";
import MenuQuery from "../queries/menuQuery";

class MenuControl {
    static addMenu (req,resp) {
        const title = req.body.title;
        const quantity = req.body.quantity;
        const price = req.body.price;
        const image = req.body.image_url;
        
        db.query(
            MenuQuery.addMenuQuery(title,quantity,price,req.tokenId,image),
            (err,res) => {
                const [menu] = res.rows;
                return resp.status(201).send({
                    status: 'success',
                    message: 'Menu Created',
                    menu: {
                        id: menu.id,
                        title: menu.title,
                        price: menu.price,
                        admin: menu.adminid,
                        image: menu.image_path
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
                if (res.rows.length < 1) {
                    return resp.status(404).send({
                        status: 'error',
                        message: 'No Menu Found '
                    })
                }
                const menu = res.rows;
                menu.forEach(obj => {
                    all.push({
                        id: obj.id,
                        title:obj.title,
                        price:obj.price,
                        quantity:obj.quantity,
                        image:obj.image_path
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
                    menu: menu
                })
            }
        )
    }
}

export default MenuControl;