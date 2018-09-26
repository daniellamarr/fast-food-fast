class AdminQuery {
    static checkAdminQuery (email) {
        return {
            text: `
            SELECT * FROM admin WHERE email = $1`,
            values: [email]
        }
    }
}

export default AdminQuery;