class AdminControl {
    static adminLogin (req,resp) {
        resp.status(200).send({
            status: "success",
            message: 'Admin login successful',
            token: req.token
        })
    }
}

export default AdminControl;