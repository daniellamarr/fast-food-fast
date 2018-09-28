class OrderQuery {
	static addOrderQuery(user,status) {
		return {
			text: `
			INSERT INTO orders (
				userid,amount,status
			) VALUES ($1, $2, $3) RETURNING *`,
			values: [user,0,status]
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

	static updateAmountQuery (id,total) {
		return {
			text: `UPDATE orders SET amount = $2 WHERE id = $1 RETURNING *`,
			values: [id,total]
		}
	}

	static getUserOrderQuery(id){
		return {
			text: `
			SELECT * FROM orders WHERE userid = $1
			`,
			values: [id]
		}
	}

	static getAllOrdersQuery(){
		return {
			text: `
			SELECT * FROM orders
			`,
		}
	}

	static getUserItemsQuery(item){
		return {
			text: `
			SELECT id,orderid,quantity FROM orderitems WHERE itemid = $1
			`,
			values: [item]
		}
	}

	static getOneOrderQuery(orderid){
		return {
			text: `
			SELECT * FROM orders WHERE id = $1`,
			values: [orderid]
		}
	}
}

export default OrderQuery;