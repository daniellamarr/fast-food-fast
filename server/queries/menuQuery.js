class MenuQuery {
    static addMenuQuery (title,quantity,price,adminid) {
        return {
            text: `
            INSERT INTO menu
            (
                title,
                quantity,
                price,
                adminid
            )
            VALUES ($1, $2, $3, $4) RETURNING *`,
            values: [title,quantity,price,adminid]
        }
    }
    static getMenuQuery() {
        return {
            text: `SELECT * FROM menu`
        }
    }
}

export default MenuQuery;