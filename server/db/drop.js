import db from "./index";

const removeUsers = `
DROP TABLE IF EXISTS users cascade
`;

const removeAdmin = `
DROP TABLE IF EXISTS admin cascade
`;

const removeMenu = `
DROP TABLE IF EXISTS menu cascade
`;

const removeOrders = `
DROP TABLE IF EXISTS orders cascade
`;

db.query(
    removeUsers,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Users Table Dropped');
        };
    }
);

db.query(
    removeAdmin,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Admin Table Dropped');
        };
    }
);

db.query(
    removeMenu,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Menu Table Dropped');
        };
    }
);

db.query(
    removeOrders,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Orders Table Dropped');
        };
    }
);