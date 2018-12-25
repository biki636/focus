const router = require('express').Router();

const UserController = require('../controllers/UserController');
const AuthCheck = require('../middleware/AuthCheck');

// LOGIN
router.post('/login', UserController.login);

// GET ALL /
router.get('/', AuthCheck, UserController.findAll);

// POST CREATE ONE /
router.post('/', UserController.post);

module.exports = router;