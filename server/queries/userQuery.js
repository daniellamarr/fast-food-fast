class UserQuery {
    static signupQuery (fullname,email,phone,address,password) {
        return {
            text: `
            INSERT INTO users
            (
                name,
                email,
                phone,
                address,
                password
            )
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            values: [fullname,email,phone,address,password]
        }
    }
    static checkUserQuery (email) {
        return {
            text: `
            SELECT * FROM users WHERE email = $1`,
            values: [email]
        }
    }
}

export default UserQuery;