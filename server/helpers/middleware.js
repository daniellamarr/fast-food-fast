import bcrypt from "bcryptjs";
import orders from "../model/orders";
import validate from "./validate";

class Middleware {
    static validatePlaceOrder (req,resp,next) {
        const {menu} = req.body;
        if (menu==null || menu.length == 0) {
            return resp.status(400).send({
                status:"error",
                message:"Your request object cannot be left empty"
            })
        }
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].order=="" || menu[i].order==null) {
                return resp.status(400).send({
                    status:"error",
                    message:"Please fill in your order"
                })
            }else if (validate.hasWhiteSpace(menu[i].order)) {
                return resp.status(400).send({
                    status:"error",
                    message:"Please fill in your order"
                })
            }else if (menu[i].quantity=="" || menu[i].quantity==null) {
                return resp.status(400).send({
                    status:"error",
                    message:"Please fill in your quantity"
                })
            }else if (typeof(menu[i].quantity) != "number") {
                return resp.status(400).send({
                    status:"error",
                    message:"Quantity must be a number"
                })
            }
        }
        
        next();
    }

    static validateGetOneOrder (req,resp,next) {
        const order = req.params.id;
        if (isNaN(order)) {
            return resp.status(400).send({
                status: 'error',
                message: 'ID parameter must be a number'
            });
        }

        next();
    }

    static validateUpdateOrderStatus (req,resp,next) {
        const status = req.body.status;
        const statusArray = ['new','processing','cancelled','complete'];
        const order = req.params.id;
        if (isNaN(order)) {
            return resp.status(400).send({
                status: 'error',
                message: 'This order was not found on the list'
            });
        }
        if (status==="" || status==null){
            return resp.status(400).send({
                status: 'error',
                message: 'Status field cannot be left empty'
            });
        }else if (validate.hasWhiteSpace(status) != false) {
            return resp.status(400).send({
                status: 'error',
                message: 'No whitespaces allowed'
            });
        }else if (statusArray.includes(status) != true) {
            return resp.status(400).send({
                status: 'error',
                message: 'The status you entered is invalid'
            });
        }
        
        req.status = status;
        
        next();
    }
    
    static validateUserSignup (req,resp,next) {
        const fullname = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (fullname==null
            || fullname.length===0
            || validate.hasWhiteSpace(fullname)) {
            return resp.status(400).send({
                status: "error",
                message: "Name field cannot be left empty"
            })
        }
        if (validate.validateInput(fullname,3,50)===false) {
            return resp.status(400).send({
                status: "error",
                message: "Name: Min Character - 3,Max character - 50"
            })
        }
        if (email==null
            || email.length===0
            || validate.hasWhiteSpace(email)) {
            return resp.status(400).send({
                status: "error",
                message: "Email field cannot be left empty"
            })
        }
        if (validate.validateEmail(email)===false){
            return resp.status(400).send({
                status: "error",
                message: "Invalid email syntax"
            })
        }
        if (validate.validateInput(email,8,50)===false) {
            return resp.status(400).send({
                status: "error",
                message: "Email: Min Character - 8,Max character - 50"
            })
        }
        if (phone==null
            || phone.length===0
            || validate.hasWhiteSpace(phone)) {
            return resp.status(400).send({
                status: "error",
                message: "Phone field cannot be left empty"
            })
        }
        if (isNaN(phone)) {
            return resp.status(400).send({
                status: "error",
                message: "Phone Number cannot be a string character"
            })
        }
        if (validate.validateInput(phone,11,15)===false) {
            return resp.status(400).send({
                status: "error",
                message: "Phone Number: Min Character - 11,Max character - 15"
            })
        }
        if (address==null
            || address.length===0
            || validate.hasWhiteSpace(address)) {
            return resp.status(400).send({
                status: "error",
                message: "Address field cannot be left empty"
            })
        }
        if (password==null
            || password.length===0
            || validate.hasWhiteSpace(password)) {
            return resp.status(400).send({
                status: "error",
                message: "Password field cannot be left empty"
            })
        }
        if (cpassword==null
            || cpassword.length===0
            || validate.hasWhiteSpace(cpassword)) {
            return resp.status(400).send({
                status: "error",
                message: "Confirm Password field cannot be left empty"
            })
        }
        if (validate.validateInput(password,8,20)===false) {
            return resp.status(400).send({
                status: "error",
                message: "Password: Min Character - 8,Max character - 20"
            })
        }
        if (password!==cpassword) {
            return resp.status(400).send({
                status: "error",
                message: "Passwords do not match"
            })
        }
        req.fullname = fullname;
        req.email = email;
        req.phone = phone;
        req.address = address;
        req.password = bcrypt.hashSync(password);

        next();
    }

    static validateLogin (req,resp,next) {
        const email = req.body.email;
        const password = req.body.password;
        
        if (email==null
            || email.length===0
            || validate.hasWhiteSpace(email)) {
            return resp.status(400).send({
                status: "error",
                message: "Email field cannot be left empty"
            })
        }
        if (validate.validateEmail(email)===false){
            return resp.status(400).send({
                status: "error",
                message: "Invalid email syntax"
            })
        }
        if (password==null
            || password.length===0
            || validate.hasWhiteSpace(password)) {
            return resp.status(400).send({
                status: "error",
                message: "Password field cannot be left empty"
            })
        }
        if (validate.validateInput(password,8,20)===false) {
            return resp.status(400).send({
                status: "error",
                message: "Password: Min Character - 8,Max character - 20"
            })
        }

        next();
    }

    static validateAddMenu (req,resp,next) {
        const title = req.body.title;
        const quantity = req.body.quantity;
        const price = req.body.price;

        if (title==null
            || title.length===0
            || validate.hasWhiteSpace(title)) {
            return resp.status(400).send({
                status: "error",
                message: 'Title field cannot be left empty'
            })
        }
        if (validate.validateInput(title,3,30)===false) {
            return resp.status(400).send({
                status: "error",
                message: 'Title: Min Char-3,Max Char-30'
            })
        }
        if (quantity==null
            || quantity.length===0
            || validate.hasWhiteSpace(quantity)) {
            return resp.status(400).send({
                status: "error",
                message: 'Quantity field cannot be left empty'
            })
        }
        if (validate.validateInput(quantity,1,4)===false) {
            return resp.status(400).send({
                status: "error",
                message: 'Quantity: Min Char-1,Max Char-4'
            })
        }
        if (isNaN(quantity)) {
            return resp.status(400).send({
                status: "error",
                message: 'Quantity cannot be a string character'
            })
        }
        if (price==null
            || price.length===0
            || validate.hasWhiteSpace(price)) {
            return resp.status(400).send({
                status: "error",
                message: 'Price field cannot be left empty'
            })
        }
        if (validate.validateInput(price,1,5)===false) {
            return resp.status(400).send({
                status: "error",
                message: 'Price: Min Char-1,Max Char-5'
            })
        }
        if (isNaN(price)) {
            return resp.status(400).send({
                status: "error",
                message: 'Price cannot be a string character'
            })
        }

        next();
    }
}

export default Middleware;