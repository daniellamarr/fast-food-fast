import bcrypt from "bcryptjs";
import orders from "../model/orders";
import validate from "./validate";
import Responses from "./response";

class Middleware {
    static validatePlaceOrder (req,resp,next) {
        const {menu} = req.body;
        if (menu==null || menu.length == 0) {
            return resp.status(400).send({
                status:"error",
                message:"Your request object cannot be left empty"
            })
        }
        let place = [];
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
            }else if (menu[i].price=="" || menu[i].price==null) {
                return resp.status(400).send({
                    status:"error",
                    message:"Please fill in your price"
                })
            }else if (typeof(menu[i].quantity) != "number") {
                return resp.status(400).send({
                    status:"error",
                    message:"Quantity must be a number"
                })
            }else if (typeof(menu[i].price) != "number") {
                return resp.status(400).send({
                    status:"error",
                    message:"Price must be a number"
                })
            }
            place.push({
                id: i + 1,
                order: menu[i].order,
                quantity: menu[i].quantity,
                price: menu[i].price
            });
        }
        req.place = place;
        
        next();
    }

    static validateGetOneOrder (req,resp,next) {
        const order = orders.find(c => c.id == req.params.id);
        if (!order) {
            return resp.status(404).send({
                status: 'error',
                message: 'This order was not found on the list'
            });
        }
        req.order = order;

        next();
    }

    static validateUpdateOrderStatus (req,resp,next) {
        const status = req.body.status;
        const statusArray = ['pending','accepted','rejected','completed'];
        const order = orders.find(c => c.id == req.params.id);
        if (!order) {
            return resp.status(404).send({
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
        req.order = order;
        
        next();
    }
    
    static validateUserSignup (req,resp,next) {
        const signup = [
            {field:req.body.name,fname:'Name',min:3,max:50},
            {field:req.body.email,fname:'Email',min:8,max:50},
            {field:req.body.phone,fname:'Phone',min:11,max:15},
            {field:req.body.address,fname:'Address',min:2,max:100},
            {field:req.body.password,fname:'Password',min:8,max:20},
            {field:req.body.cpassword,fname:'Confirm Password',min:8,max:20},
        ]
        let response = [];
        signup.forEach(obj => {
            if(obj.field==null){
                response.push({
                    status: 'error',
                    message: `${obj.fname} cannot be null`
                })
            }else{
                response.push(Responses.nullField(obj.field,
                    `${obj.fname} field cannot be left empty`));
                response.push(Responses.inputLength(obj.field,
                `${obj.fname}: Min Char-${obj.min}, Max Char-${obj.max}`,
                obj.min,obj.max));
                if (obj.fname=="Email") {
                    response.push(Responses.emailCheck(obj.field,
                        "Invalid email syntax"));
                }
                if (obj.fname=="Phone") {
                    response.push(Responses.isNaNCheck(obj.field,
                        `${obj.fname} cannot be a string character`));
                }
            }
        });
        response.push(Responses.stringMatch(signup[4].field,signup[5].field,
            "Passwords do not match"));
        response = response.filter((e) => e !== undefined);
        if (response != "") {
            resp.status(400).send(response[0])
        }else{
            req.fullname = signup[0].field;
            req.email = signup[1].field;
            req.phone = signup[2].field;
            req.address = signup[3].field;
            req.password = bcrypt.hashSync(signup[4].field);
            next();
        }
    }

    static validateLogin (req,resp,next) {
        const email = req.body.email;
        const password = req.body.password;
        let re = [];
        if (email==null) {
            re.push({status:'error',message:'Email cannot be left empty'})
        }else if (password==null) {
            re.push({status:'error',message:'Password cannot be left empty'})
        }else{
            re.push(Responses.nullField(email,
                "Email field cannot be left empty"));
            re.push(Responses.emailCheck(email,
                "Invalid email syntax"));
            re.push(Responses.nullField(password,
                "Password field cannot be left empty"));
            re.push(Responses.inputLength(password,
                "Password: Min Char-8, Max Char-20",8,20));
        }
        re = re.filter((e) => e !== undefined);
        if (re != "") {
            resp.status(400).send(re[0])
        }else{
            next();
        }
    }

    static validateAddMenu (req,resp,next) {
        const title = req.body.title;
        const quantity = req.body.quantity;
        const price = req.body.price;
        let response = [];
        if (title==null) {
            response.push({
                status:'error',
                message: 'Title field cannot be left empty'
            })
        }else if (quantity==null) {
            response.push({
                status:'error',
                message: 'Quantity field cannot be left empty'
            })
        }else if (price==null) {
            response.push({
                status:'error',
                message: 'Price field cannot be left empty'
            })
        }else{
            response.push(Responses.nullField(title,
                "Title field cannot be left empty"));
            response.push(Responses.inputLength(title,
                "Title: Min Char-3,Max Char-30",3,30));
            response.push(Responses.nullField(quantity,
                "Quantity field cannot be left empty"));
            response.push(Responses.isNaNCheck(quantity,
                "Quantity cannot be a string character"));
            response.push(Responses.inputLength(quantity,
                "Quantity: Min Char-1,Max Char-4",1,4));
            response.push(Responses.nullField(price,
                "Price field cannot be left empty"));
            response.push(Responses.inputLength(price,
                "Price: Min Char-1,Max Char-4",1,5));
            response.push(Responses.isNaNCheck(price,
                "Price cannot be a string character"));
        }
        response = response.filter((e) => e !== undefined);
        if (response != "") {
            resp.status(400).send(response[0])
        }else{
            next();
        }
    }
}

export default Middleware;