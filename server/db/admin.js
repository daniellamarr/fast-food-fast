import bcrypt from "bcryptjs";
import db from "./index";

const fullname = 'Admin Fastfood';
const email = 'admin@fastfoodfast.com';
const phone  = '+2348135270797';
const password = bcrypt.hashSync('admin12345678');

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