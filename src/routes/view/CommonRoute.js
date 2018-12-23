const router = require('express').Router();

// /signup
router.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Sign Up'
    });
});

module.exports = router;