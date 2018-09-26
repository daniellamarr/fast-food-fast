import jwt from 'jsonwebtoken';
import keyconfig from './keyconfig';

const tokendecode = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({
            status: 'error',
            message: 'No token provided.'
        });
    }
    jwt.verify(token, keyconfig, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                status: 'error', message: 'Unauthorized token'
            });
        }
        req.tokenId = decoded.id;
        req.tokenKey = decoded.key;

        next();
    })
}

export default tokendecode;