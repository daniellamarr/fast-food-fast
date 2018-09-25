import jwt from "jsonwebtoken";
import db from "../db/index";
import UserQuery from "../queries/userQuery";
import keyconfig from "../jwt/keyconfig";

class UserControl {
    static userSignup (req,resp) {
        db.query(
            UserQuery.signupQuery(
                req.fullname,
                req.email,
                req.phone,
                req.address,
                req.password
            ),
            (err,res) => {
                const [user] = res.rows;
                const token = jwt.sign({id: user.id }, keyconfig, {
                    expiresIn: 86400
                });
                resp.status(201).send({
                    status: "success",
                    message: "Your sign up was successful",
                    token: token
                });
            }
        )
    }
    
    static userLogin (req,resp) {
        resp.status(200).send({
            status: "success",
            message: `Your are logged in as ${req.email}`,
            token: req.token
        })
    }
}

export default UserControl;