const router = require('express').Router();
const UserModel = require('../../models/User');

// GET ALL /
router.get('/', (req, res) => {
    UserModel.find({}, (err, data) => {
        if(err) return res.status(500).send(err);

        res.json(data);
    });
});

// POST CREATE ONE /
router.post('/', (req, res) => {

    const user = new UserModel({...req.body});
    user.save(user, (err, data) => {
        if(err) return res.status(500).json(err);

        res.status(201).send(data);
    });
});

module.exports = router;