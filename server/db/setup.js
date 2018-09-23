import db from "./index";

const createUsers = `
CREATE TABLE users (
    id serial PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone INT NOT NULL,
    password VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createAdmin = `
CREATE TABLE admin (
    id serial PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone INT NOT NULL,
    password VARCHAR(100) NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createMenu = `
CREATE TABLE menu (
    id serial PRIMARY KEY NOT NULL,
    adminid INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    image_path VARCHAR(50) NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createOrders = `
CREATE TABLE orders (
    id serial PRIMARY KEY NOT NULL,
    userid INT NOT NULL,
    menu TEXT NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

db.query(
    createUsers,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Users Table Added');
        };
    }
);

db.query(
    createAdmin,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Admin Table Added');
        };
    }
);

db.query(
    createMenu,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Menu Table Added');
        };
    }
);

db.query(
    createOrders,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Orders Table Added');
        };
    }
);