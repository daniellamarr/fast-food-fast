import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const should = _should();

use(chaiHttp);

describe('/POST /api/v1/auth/admin', () => {
    it('it should login an admin', (done) => {
    const user = {
        email: "admin@fastfoodfast.com",
        password: "admin12345678"
    }
    request(server)
        .post('/api/v1/auth/admin')
        .send(user)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })

    it('it should return a 400 error, email is null', (done) => {
    const user = {
        password: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/admin')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('it should return a 400 error, email syntax is invalid', (done) => {
    const user = {
        email: "admin@fastfood",
        password: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/admin')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('it should return a 400 error, password is null', (done) => {
    const user = {
        email: "admin@fastfood.com"
    }
    request(server)
        .post('/api/v1/auth/admin')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('return a 400 error, password is below or above length', (done) => {
    const user = {
        email: "admin@gmail.com",
        password: "wer"
    }
    request(server)
        .post('/api/v1/auth/admin')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('return a 401 error, admin access not granted', (done) => {
    const user = {
        email: "dave@gmail.com",
        password: "ssssawwqqqqq"
    }
    request(server)
        .post('/api/v1/auth/admin')
        .send(user)
        .end((err,res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
        })
    })

    it('return a 401 error, incorrect password', (done) => {
    const user = {
        email: "admin@fastfoodfast.com",
        password: "sssaqqqqqasd"
    }
    request(server)
        .post('/api/v1/auth/admin')
        .send(user)
        .end((err,res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
        })
    })
})