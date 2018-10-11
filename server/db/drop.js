import db from "./index";

const removeUsers = `
DROP TABLE IF EXISTS users CASCADE
`;

const removeAdmin = `
DROP TABLE IF EXISTS admin CASCADE
`;

const removeMenu = `
DROP TABLE IF EXISTS menu CASCADE
`;

const removeOrders = `
DROP TABLE IF EXISTS orders CASCADE
`;

const removeOrderItems = `
DROP TABLE IF EXISTS orderitems CASCADE
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

db.query(
    removeOrderItems,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Orders Items Table Dropped');
        };
    }
);