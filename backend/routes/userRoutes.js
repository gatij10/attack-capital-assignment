const express = require('express');
const { register, login, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/users', getAllUsers);

module.exports = router;
