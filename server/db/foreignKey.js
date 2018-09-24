import db from "./index";

const ordersAForeignKey = `
ALTER TABLE orders 
ADD CONSTRAINT ordersakey FOREIGN KEY (acceptid)
REFERENCES admin (id) ON DELETE CASCADE;
`;

const ordersUForeignKey = `
ALTER TABLE orders 
ADD CONSTRAINT ordersukey FOREIGN KEY (userid)
REFERENCES users (id) ON DELETE CASCADE;
`;

const menuForeignKey = `
ALTER TABLE menu 
ADD CONSTRAINT menukey FOREIGN KEY (adminid)
REFERENCES admin (id) ON DELETE CASCADE;
`;

db.query(
    ordersAForeignKey,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Admin Key Added');
        };
    }
);

db.query(
    ordersUForeignKey,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Users Key Added');
        };
    }
);

db.query(
    menuForeignKey,
    (err,res) => {
        if (err) {
            throw err
        }else{
            console.log('Users Menu Key Added');
        };
    }
);