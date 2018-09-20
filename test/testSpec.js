import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
let should = _should();

use(chaiHttp);

describe('/GET /api/v1/orders', () => {
    it('it should GET all orders', (done) => {
    request(server)
        .get('/api/v1/orders')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/GET /api/v1/orders/:id', () => {
    it('it should GET a specific order', (done) => {
    request(server)
        .get('/api/v1/orders/' + 1)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 404 error', (done) => {
    request(server)
        .get('/api/v1/orders/' + 3)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/POST /api/v1/orders', () => {
    it('it should place an order', (done) => {
    const test_order = {
        "menu": [
            {
                "order":"Shawarma",
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
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 error status if req.body object is null', (done) => {
    const test_order = {}
    request(server)
        .post('/api/v1/orders')
        .send(test_order)
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
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 error status when price parameter does not exist', (done) => {
    const test_order = {
        "menu": [
            {
                "order":"Shawarma",
                "quantity":2
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
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should return a 400 error status when price parameter is not a number', (done) => {
    const test_order = {
        "menu": [
            {
                "order":"Shawarma",
                "quantity":2,
                "price":2000
            },
            {
                "order":"Pizza",
                "quantity":5,
                "price":"1000"
            }
        ]
    }
    request(server)
        .post('/api/v1/orders')
        .send(test_order)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/POST /api/v1/orders', () => {
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