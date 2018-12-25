const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');
const JWT_SECRET = require('../config/jwtconfig').secret;

// Login
exports.login = (req, res) => {
    // First get the user
    UserModel.findOne({email: req.body.email}, (err, user) => {
        if(err) {
            console.error(err);
            return res.status(500).send({
                error: err
            });
        }

        // 401 if the user is not present
        if(! user) return res.status(401).send({
            message: 'Auth failed'
        });

        // if the user is present, then match the password
        bcrypt.compare(req.body.password, user.password, (err, same) => {
            if(err) {
                console.error(err);
                return res.status(500).json({
                    error: err
                });
            }

            if(same) {
                const token = jwt.sign({
                    _id: user._id,
                    email: user.email
                },
                JWT_SECRET,
                {
                    expiresIn: '1h'
                });

                res.send({ token });
            } else {
                res.status(401).json({
                    message: 'Auth faild'
                });
            }
        });
    });
}

// Find all
exports.findAll = (req, res) => {
    UserModel.find({}, (err, data) => {
        if(err) return res.status(500).send(err);

        res.json(data);
    });
}

// POST / create
exports.post = (req, res) => {

    const user = new UserModel({...req.body});
    user._id = mongoose.Types.ObjectId();
    
    // Bcrypting the password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            console.error(err);
            return res.status(500).json({
                error: err
            });
        }

        user.password = hash;

        // Save the user
        user.save(user, (err, data) => {
            if(err) {
                console.error(err);
                return res.status(500).json({error : err});
            }
    
            res.status(201).send(data);
        });
    });

}