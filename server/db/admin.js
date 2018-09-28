import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import db from "./index";

dotenv.config();

const fullname = process.env.ADMINNAME;
const email = process.env.ADMINEMAIL;
const phone  = process.env.ADMINPHONE;
const password = bcrypt.hashSync(process.env.ADMINPASS);

const adminData = {
    text: `
    INSERT INTO admin (
        name,
        email,
        phone,
        password
    ) VALUES ($1, $2, $3, $4)`,
    values: [fullname,email,phone,password]
};

db.query(
    adminData,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Admin Created');
        };
    }
);