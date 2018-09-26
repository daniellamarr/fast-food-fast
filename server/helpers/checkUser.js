import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../db/index";
import UserQuery from "../queries/userQuery";
import keyconfig from "../jwt/keyconfig";
import AdminQuery from "../queries/adminQuery";
import Responses from "./response";

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
			UserQuery.checkUserQuery(req.body.email), (err,res) => {
                let response = [];
                let token;
                const userrows = Responses.rowNotFound(res.rows.length,
                    "Invalid username or passwords");
                response.push(userrows);
                if (userrows==undefined){
                    const [user] = res.rows;
                    response.push(Responses.invalidLogin(req.body.password,
                        user.password,"Invalid username or password"));
                    token = jwt.sign({id:user.id,key: user.email},keyconfig,{
                        expiresIn: 86400
                    });
                }
                response = response.filter((e) => e !== undefined);
                if (response != "") {
                    resp.status(401).send(response[0])
                }else{
                    req.token = token;
                    req.email = req.body.email
                    next();
                }
			}
		)
    }

    static adminLoginCredentials (req,resp,next) {
        db.query(
			AdminQuery.checkAdminQuery(req.body.email), (err,res) => {
                let response = [];
                let token;
                const userrows = Responses.rowNotFound(res.rows.length,
                    "Invalid username or password");
                response.push(userrows);
                if (userrows==undefined){
                    const [user] = res.rows;
                    response.push(Responses.invalidLogin(req.body.password,
                        user.password,"Invalid username or password"));
                    token = jwt.sign({id:user.id,key: user.email},keyconfig,{
                        expiresIn: 86400
                    });
                }
                response = response.filter((e) => e !== undefined);
                if (response != "") {
                    resp.status(401).send(response[0])
                }else{
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
                let response = [];
                response.push(Responses.rowNotFound(res.rows.length,
                    "You are not authorized"));
                    
                response = response.filter((e) => e !== undefined);
                if (response != "") {
                    resp.status(400).send(response[0])
                }else{
                    next();
                }
			}
		)
    }
}

export default CheckUser;