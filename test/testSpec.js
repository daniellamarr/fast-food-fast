import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
let should = _should();

use(chaiHttp);

let test_order = {
    order:"Icecream,Pizza,Shawarma",
    quantity:"10,8,4",
    status: false
}

let test_order_fail = {
    order:"",
    quantity:"10,8,4",
    status: false
}

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

    it('it should fail with a 404 error', (done) => {
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
    request(server)
        .post('/api/v1/orders')
        .send(test_order)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });

    it('it should fail with a 400 error', (done) => {
    request(server)
        .post('/api/v1/orders')
        .send(test_order_fail)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/POST /api/v1/orders', () => {
    it('it should update an order status', (done) => {
    request(server)
        .put('/api/v1/orders/' + 1)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});