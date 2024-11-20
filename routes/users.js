const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Criar um novo usuário
router.post('/', async (req, res) => {
    const { username, password, role, profilePicture } = req.body;
    const user = new User({ username, password, role, profilePicture });
    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso' });
});

// Obter todos os usuários
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

module.exports = router;
