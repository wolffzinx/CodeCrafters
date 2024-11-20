const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.createUser);
// Adicione outras rotas de login, etc.

module.exports = router;
