import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const should = _should();

use(chaiHttp);

describe('/POST /api/v1/auth/signup', () => {
    it('it should sign up a user', (done) => {
    const user = {
        name: "Lamarr",
        email: "danielal@gmail.com",
        phone: "09099887766",
        address: "Anthony, Lagos",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
        })
    })

    it('it should return a 400 error if name is null', (done) => {
    const user = {
        email: "daniel@gmail.com",
        phone: "09099887766",
        address: "Anthony, Lagos",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error,name is below or above length', (done) => {
    const user = {
        name: "La",
        email: "daniel@gmail.com",
        phone: "09099887766",
        address: "Anthony, Lagos",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('it should return a 400 error, email is null', (done) => {
    const user = {
        name: "Lamarr",
        phone: "09099887766",
        address: "Anthony, Lagos",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('it should return a 400 error, email is invalid', (done) => {
    const user = {
        name: "Lamarr",
        email: "danielgmail.com",
        phone: "09099887766",
        address: "Anthony, Lagos",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error, email is below or above length', (done) => {
    const user = {
        name: "Lamarr",
        email: "d@g.co",
        phone: "09099887766",
        address: "Anthony, Lagos",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error, phone is null', (done) => {
    const user = {
        name: "Lamarr",
        email: "dann@gmail.com",
        address: "Anthony, Lagos",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error, phone is invalid', (done) => {
    const user = {
        name: "Lamarr",
        email: "dann@gmail.com",
        phone: "08033776651aa",
        address: "Anthony, Lagos",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error, phone is below or above length', (done) => {
    const user = {
        name: "Lamarr",
        email: "dann@gmail.com",
        phone: "08033776",
        address: "Anthony, Lagos",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error, address is null', (done) => {
    const user = {
        name: "Lamarr",
        email: "dann@gmail.com",
        phone: "08033776889",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error, password is null', (done) => {
    const user = {
        name: "Lamarr",
        email: "dann@gmail.com",
        phone: "08033776889",
        address: "Egbe, Ikotun",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error, confirm password is null', (done) => {
    const user = {
        name: "Lamarr",
        email: "dann@gmail.com",
        phone: "08033776889",
        address: "Egbe, Ikotun",
        password: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error, password invalid length', (done) => {
    const user = {
        name: "Lamarr",
        email: "dann@gmail.com",
        phone: "08033776889",
        address: "Egbe, Ikotun",
        password: "sssqqqqqqqqqqqqqqqqqqqqqqqqqq",
        cpassword: "qwertyiiiop"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error, passwords do not match', (done) => {
    const user = {
        name: "Lamarr",
        email: "dann@gmail.com",
        phone: "08033776889",
        address: "Egbe, Ikotun",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyiiiop"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })

    it('should return a 400 error, passwords do not match', (done) => {
    const user = {
        name: "Lamarr",
        email: "danielal@gmail.com",
        phone: "08033776889",
        address: "Egbe, Ikotun",
        password: "qwertyuiopasdfg",
        cpassword: "qwertyuiopasdfg"
    }
    request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
        })
    })
})