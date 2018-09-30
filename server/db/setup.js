import db from "./index";

const createUsers = `
CREATE TABLE users (
    id serial PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone NUMERIC(15) NOT NULL,
    password VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createAdmin = `
CREATE TABLE admin (
    id serial PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone NUMERIC(15) NOT NULL,
    password VARCHAR(100) NOT NULL,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createMenu = `
CREATE TABLE menu (
    id serial PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    quantity NUMERIC(15) NOT NULL,
    price NUMERIC(15) NOT NULL,
    image_path VARCHAR(100),
    adminid INT,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createOrders = `
CREATE TABLE orders (
    id serial PRIMARY KEY NOT NULL,
    userid INT NOT NULL,
    amount NUMERIC(15) NOT NULL,
    status VARCHAR(20) NOT NULL,
    adminid INT,
    date_created TIMESTAMP DEFAULT Now()
)
`;

const createOrderItems = `
CREATE TABLE orderitems (
    id serial PRIMARY KEY NOT NULL,
    itemid INT NOT NULL,
    orderid VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
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

db.query(
    createOrderItems,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Order Items Table Added');
        };
    }
);