import db from "./index";

const confirmTables = `
SELECT * FROM information_schema.table_constraints
WHERE constraint_name='ordersakey' AND table_name='orders';
`;

const ordersAForeignKey = `
ALTER TABLE orders 
ADD CONSTRAINT ordersakey FOREIGN KEY (adminid)
REFERENCES admin (id) ON DELETE CASCADE;
`;

const ordersUForeignKey = `
ALTER TABLE orders 
ADD CONSTRAINT ordersukey FOREIGN KEY (userid)
REFERENCES users (id) ON DELETE CASCADE;
`;

const ordersIForeignKey = `
ALTER TABLE orderitems 
ADD CONSTRAINT itemskey FOREIGN KEY (itemid)
REFERENCES orders (id) ON DELETE CASCADE;
`;

const menuForeignKey = `
ALTER TABLE menu 
ADD CONSTRAINT menukey FOREIGN KEY (adminid)
REFERENCES admin (id) ON DELETE CASCADE;
`;

db.query(confirmTables)
.then(res => {
    if (res.rows.length < 1) {
        console.log('Keys exist');
    }else{
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
            ordersIForeignKey,
            (err,res) => {
                if (err) {
                    throw err
                }else{
                    console.log('Order Items Key Added');
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
    }
})