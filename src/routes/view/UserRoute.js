const router = require('express').Router();
const UserModel = require('../../models/User');
const {check, validationResult} = require('express-validator/check');

// /Users
router.get('/', (req, res) => {
    res.render('user', {
        title: 'Add User'
    });
});

router.post('/', [
    check('email')
        .not().isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid.'),

    check('password')
        .isLength({min: 8})
        .withMessage('Password length must be at least 8 characters.'),

    check('password2')
        .equals('password')
        .withMessage('Passwords do not match'),

    check('gender')
        .not().isEmpty()
        .withMessage('Gender is required.'),

    check('dob')
        .not().isEmpty()
        .withMessage('Birth Date is required.')
], (req, res) => {

    const errors = validationResult(req);
    if(errors) {
        // res.json(errors.array());
        req.flash('danger', errors.array().map(e => e.msg));
        res.redirect('/signup');
    }

    res.send('Success');
});

module.exports = router;