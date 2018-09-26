class AdminQuery {
    static checkAdminQuery (email) {
        return {
            text: `
            SELECT * FROM admin WHERE email = $1`,
            values: [email]
        }
    }

    static checkAdminIDQuery (id) {
        return {
            text: `
            SELECT * FROM admin WHERE id = $1`,
            values: [id]
        }
    }
}

export default AdminQuery;