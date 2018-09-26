import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import dotenv from 'dotenv';

dotenv.config();

const should = _should();

use(chaiHttp);


let requestToken;
let userToken;
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
before((done) => {
const user = {
    name: "Lamarr",
    email: "danny@gmail.com",
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

describe('/POST /api/v1/menu', () => {
    it('it should add a new menu', (done) => {
    const menu = {
        title: 'Beans',
        quantity: '10',
        price: '1000'
    }
    request(server)
        .post('/api/v1/menu')
        .send(menu)
        .set('x-access-token',requestToken)
        .end((err,res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
        })
    })

    it('return a 400 error, title is null', (done) => {
    const menu = {
        quantity: '10',
        price: '1000'
    }
    request(server)
        .post('/api/v1/menu')
        .send(menu)
        .set('x-access-token',requestToken)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('return a 400 error, quantity is null', (done) => {
    const menu = {
        title: 'Rice',
        price: '950'
    }
    request(server)
        .post('/api/v1/menu')
        .send(menu)
        .set('x-access-token',requestToken)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('return a 400 error, price is null', (done) => {
    const menu = {
        title: 'Spaghetti',
        quantity: '10'
    }
    request(server)
        .post('/api/v1/menu')
        .send(menu)
        .set('x-access-token',requestToken)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('return a 401 error, token not found', (done) => {
    const menu = {
        title: 'Spaghetti',
        quantity: '10',
        price:'2000'
    }
    request(server)
        .post('/api/v1/menu')
        .send(menu)
        .end((err,res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
        })
    })

    it('return a 401 error, unauthorized token', (done) => {
    const menu = {
        title: 'Spaghetti',
        quantity: '10',
        price:'2000'
    }
    request(server)
        .post('/api/v1/menu')
        .send(menu)
        .set('x-access-token','asdfghjkl')
        .end((err,res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
        })
    })

    it('return a 400 error, unvalidated admin entry', (done) => {
    const menu = {
        title: 'Spaghetti',
        quantity: '10',
        price:'2000'
    }
    request(server)
        .post('/api/v1/menu')
        .send(menu)
        .set('x-access-token',userToken)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })
})