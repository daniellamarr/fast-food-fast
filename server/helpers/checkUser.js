import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../db/index";
import UserQuery from "../queries/userQuery";
import keyconfig from "../jwt/keyconfig";

class CheckUser {
	static validateUser (req,resp,next) {
		db.query(
			UserQuery.checkUserQuery(req.body.email),
			(err,res) => {
                if (res.rows.length > 0) {
                    return resp.status(400).send({
                        status:"error",
                        message:"This email already exists"
                    })
                }else{
                    next()
                }
			}
		)
    }
    
    static loginCredentials (req,resp,next) {
        db.query(
			UserQuery.checkUserQuery(req.body.email),
			(err,res) => {
                if (res.rows.length < 1) {
                    return resp.status(401).send({
                        status:"error",
                        message:"You have entered a wrong credential"
                    })
                }else{
                    const [user] = res.rows;
                    const pass = bcrypt.compareSync(
                        req.body.password,
                        user.password
                    );
                    if (!pass) {
                        return resp.status(401).send({
                            status:"error",
                            message:"You have entered a wrong credential"
                        });
                    }
                    const token = jwt.sign({ id: user.id }, keyconfig, {
                        expiresIn: 86400
                    });

                    req.token = token;
                    req.email = req.body.email

                    next();
                }
			}
		)
    }
}

export default CheckUser;