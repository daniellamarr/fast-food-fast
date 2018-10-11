import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import db from "./index";

dotenv.config();

const fullname = process.env.ADMINNAME;
const email = process.env.ADMINEMAIL;
const phone  = process.env.ADMINPHONE;
const password = bcrypt.hashSync(process.env.ADMINPASS);

const confirmTables = `
SELECT * FROM admin WHERE id = 1
`;

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

db.query(confirmTables)
.then(res => {
    if (res.rows.length > 0) {
        console.log('Admin exists');
    }else{
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
    }
})