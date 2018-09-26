import bcrypt from "bcryptjs";
import validate from "./validate";

class Responses {
    static nullField (field,response) {
        if (field==null
            || field.length===0
            || validate.hasWhiteSpace(field)) {
            return {
                status: "error",
                message: response
            }
        }
    }
    static inputLength (field,response,s,e) {
        if (validate.validateInput(field,s,e)===false) {
            return {
                status: "error",
                message: response
            }
        }
    }
    static emailCheck (field,response) {
        if (validate.validateEmail(field)===false){
            return {
                status: "error",
                message: response
            }
        }
    }
    static isNaNCheck (field,response) {
        if (isNaN(field)) {
            return {
                status: "error",
                message: response
            }
        }
    }
    static stringMatch (p1,p2,response) {
        if (p1!==p2) {
            return {
                status: "error",
                message: response
            }
        }
    }
    static rowNotFound (row,response) {
        if (row < 1) {
            return {
                status:"error",
                message:response
            }
        }
    }
    static invalidLogin (ref,hash,response) {
        const pass = bcrypt.compareSync(ref,hash);
        if (!pass) {
            return{
                status:"error",
                message:response
            };
        }
    }
}

export default Responses;