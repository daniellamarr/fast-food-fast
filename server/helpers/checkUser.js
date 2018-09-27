import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../db/index";
import UserQuery from "../queries/userQuery";
import keyconfig from "../jwt/keyconfig";
import AdminQuery from "../queries/adminQuery";

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

    static userCheck (req,resp,next) {
		db.query(
			UserQuery.checkUserIDQuery(req.tokenId),
			(err,res) => {
                if (res.rows.length < 1) {
                    return resp.status(401).send({
                        status:"error",
                        message:"You are not logged in"
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
                        message:"Incorrect username or password"
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
                            message:"Incorrect username or password"
                        });
                    }
                    const token = jwt.sign({
                        id:user.id,key:user.email}, keyconfig, {
                        expiresIn: 86400
                    });

                    req.token = token;
                    req.email = req.body.email

                    next();
                }
			}
		)
    }

    static adminLoginCredentials (req,resp,next) {
        db.query(
			AdminQuery.checkAdminQuery(req.body.email),
			(err,res) => {
                if (res.rows.length < 1) {
                    return resp.status(401).send({
                        status:"error",
                        message:"Incorrect username or password"
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
                            message:"Incorrect username or password"
                        });
                    }
                    const token = jwt.sign({
                        id: user.id,key:user.email}, keyconfig, {
                        expiresIn: 86400
                    });

                    req.token = token;
                    req.email = req.body.email

                    next();
                }
			}
		)
    }

    static validateAdmin (req,resp,next) {
		db.query(
			AdminQuery.checkAdminQuery(req.tokenKey),
			(err,res) => {
                if (res.rows.length < 1) {
                    return resp.status(401).send({
                        status:"error",
                        message:'Unauthorized access'
                    })
                }

                next();
			}
		)
    }
}

export default CheckUser;