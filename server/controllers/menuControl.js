import db from "../db";
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
}

export default MenuControl;