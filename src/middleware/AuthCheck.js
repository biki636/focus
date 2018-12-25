const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log({auth:req.headers.authorization});
    jwt.verify(req.headers.authorization, require('../config/jwtconfig').secret, null, (err, decoded) => {
        if(err) {
            console.error(err);
            return res.status(401).json({
                message: 'Auth faild'
            });
        }
        console.log({decoded});
        next();
    });
};