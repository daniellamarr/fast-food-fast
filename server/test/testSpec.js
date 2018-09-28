import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const should = _should();

use(chaiHttp);

let requestToken;
let userToken;
let smallToken;
before((done) => {
const user = {
    name: "Lamarr",
    email: "danielo@gmail.com",
    phone: "09099887766",
    address: "Anthony, Lagos",
    password: "123456789",
    cpassword: "123456789"
}
request(server)
    .post('/api/v1/auth/signup')
    .send(user)
    .end((err,res) => {
        const { token } = res.body;
        userToken = token;
        done();
    })
})
before((done) => {
const user = {
    name: "Funsho",
    email: "funsho@gmail.com",
    phone: "09099887766",
    address: "Anthony, Lagos",
    password: "123456789",
    cpassword: "123456789"
}
request(server)
    .post('/api/v1/auth/signup')
    .send(user)
    .end((err,res) => {
        const { token } = res.body;
        smallToken = token;
        done();
    })
})
before((done) => {
const user = {
    email: 'admin@fastfoodfast.com',
    password: 'admin12345678'
}
request(server)
    .post('/api/v1/auth/admin')
    .send(user)
    .end((err,res) => {
        const { token } = res.body;
        requestToken = token;
        done();
    })
})

describe('/GET /api/v1/orders', () => {
    it('it should return a 404 error, orders not found', (done) => {
    request(server)
        .get('/api/v1/orders')
        .set('x-access-token',requestToken)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/GET /api/v1/orders/:id', () => {
    it('it should return a 404 error, order not found', (done) => {
    request(server)
        .get('/api/v1/orders/' + 10)
        .set('x-access-token',requestToken)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/GET /api/v1/users/:id/orders', () => {
    it('it should return 404 error, no order found', (done) => {
    request(server)
        .get('/api/v1/users/1/orders')
        .set('x-access-token',smallToken)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return 404 error, user does not exist', (done) => {
    request(server)
        .get('/api/v1/users/20/orders')
        .set('x-access-token',userToken)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });
})

describe('/POST /api/v1/orders', () => {
    it('it should place an order', (done) => {
    const test_order = {
        "menu": [
            {
                "order":"Beans",
                "quantity":2,
                "price":1000
            },
        ]
    }
    request(server)
        .post('/api/v1/orders')
        .send(test_order)
        .set('x-access-token',userToken)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return 404 error if menu is not found', (done) => {
    const test_order = {
        "menu": [
            {
                "order":"Frittles",
                "quantity":2,
                "price":2000
            },
        ]
    }
    request(server)
        .post('/api/v1/orders')
        .send(test_order)
        .set('x-access-token',userToken)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 error status if req.body object is null', (done) => {
    const test_order = {}
    request(server)
        .post('/api/v1/orders')
        .send(test_order)
        .set('x-access-token',userToken)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 error status if order parameter does not exist', (done) => {
    const test_order = {
        "menu": [
            {
                "quantity":2,
                "price":2000
            },
            {
                "order":"Pizza",
                "quantity":5,
                "price":1000
            }
        ]
    }
    request(server)
        .post('/api/v1/orders')
        .send(test_order)
        .set('x-access-token',userToken)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 error status if whitespaces exists on field', (done) => {
    const test_order = {
        "menu": [
            {
                "order":"   ",
                "quantity":2,
                "price":2000
            },
            {
                "order":"Pizza",
                "quantity":5,
                "price":1000
            }
        ]
    }
    request(server)
        .post('/api/v1/orders')
        .send(test_order)
        .set('x-access-token',userToken)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 error status when quantity parameter does not exist', (done) => {
    const test_order = {
        "menu": [
            {
                "order":"Shawarma",
                "quantity":4,
                "price":2000
            },
            {
                "order":"Pizza",
                "price":1000
            }
        ]
    }
    request(server)
        .post('/api/v1/orders')
        .send(test_order)
        .set('x-access-token',userToken)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });
    
    it('it should return a 400 error status when quantity parameter is not a number', (done) => {
    const test_order = {
        "menu": [
            {
                "order":"Shawarma",
                "quantity":"2",
                "price":2000
            },
            {
                "order":"Pizza",
                "quantity":5,
                "price":1000
            }
        ]
    }
    request(server)
        .post('/api/v1/orders')
        .send(test_order)
        .set('x-access-token',userToken)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/PUT /api/v1/orders', () => {
    it('it should update an order status', (done) => {
    const test_status = {
        status: "accepted"
    }
    request(server)
        .put('/api/v1/orders/' + 1)
        .send(test_status)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 status error when status field is empty or null', (done) => {
    request(server)
        .put('/api/v1/orders/' + 1)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 status error when status field has white spaces', (done) => {
    const test_status = {
        status: "   "
    }
    request(server)
        .put('/api/v1/orders/' + 1)
        .send(test_status)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 status error when status is invalid', (done) => {
    const test_status = {
        status: "qwedfrgvbvc"
    }
    request(server)
        .put('/api/v1/orders/' + 1)
        .send(test_status)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 404 error if id does not exist', (done) => {
    request(server)
        .put('/api/v1/orders/ryiy8iby')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/GET /api/v1/users/:id/orders', () => {
    it('it should return all orders', (done) => {
    request(server)
        .get('/api/v1/users/2/orders')
        .set('x-access-token',userToken)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
})

describe('/GET /api/v1/orders', () => {
    it('it should GET all orders', (done) => {
    request(server)
        .get('/api/v1/orders')
        .set('x-access-token',requestToken)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/GET /api/v1/orders/:id', () => {
    it('it should return a 401 error status, no token provided', (done) => {
    request(server)
        .get('/api/v1/orders/' + 1)
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 error, id is not an integer', (done) => {
    request(server)
        .get('/api/v1/orders/1a')
        .set('x-access-token',requestToken)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should get a specific order', (done) => {
    request(server)
        .get('/api/v1/orders/' + 1)
        .set('x-access-token',requestToken)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});