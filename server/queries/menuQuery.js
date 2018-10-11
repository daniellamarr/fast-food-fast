class MenuQuery {
    static addMenuQuery (title,quantity,price,adminid,image) {
        return {
            text: `
            INSERT INTO menu
            (
                title,
                quantity,
                price,
                adminid,
                image_path
            )
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            values: [title,quantity,price,adminid,image]
        }
    }
    static getAllMenuQuery() {
        return {
            text: `SELECT * FROM menu WHERE quantity > 0 ORDER BY id DESC`
        }
    }

    static getOneMenuQuery(title) {
        return {
            text: `SELECT * FROM menu WHERE title = $1 AND quantity > 0`,
            values: [title]
        }
    }

    static getOneMenuIDQuery(id) {
        return {
            text: `SELECT id,title,price,quantity,image_path
            FROM menu WHERE id = $1 AND quantity > 0`,
            values: [id]
        }
    }

    static updateMenuQtyQuery(id,quantity) {
        return {
            text: `UPDATE menu SET quantity = $2 WHERE id = $1`,
            values: [id,quantity]
        }
    }
}

export default MenuQuery;