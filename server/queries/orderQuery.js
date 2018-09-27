class OrderQuery {
	static addOrderQuery(user,total,status) {
		return {
			text: `
			INSERT INTO orders (
				userid,amount,status
			) VALUES ($1, $2, $3) RETURNING *`,
			values: [user,total,status]
		}
	}

	static addOrderItemsQuery (item,order,quantity) {
		return {
			text: `
			INSERT INTO orderitems (
				itemid,orderid,quantity
			) VALUES ($1, $2, $3) RETURNING *`,
			values: [item,order,quantity]
		}
	}
}

export default OrderQuery;