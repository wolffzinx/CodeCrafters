const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Certifique-se de que o modelo User está definido corretamente
const router = express.Router();

// Rota de registro
router.post('/register', async (req, res) => {
    const { username, password, role, profilePicture } = req.body;

    // Validações básicas
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Nome de usuário já existe.' });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            password: hashedPassword,
            role,
            profilePicture
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error); // Adicionando log de erro
        res.status(500).json({ message: 'Erro ao registrar o usuário', error });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!username || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha inválida!' });
        }

        // Retornar o papel do usuário junto com a mensagem de sucesso
        res.status(200).json({
            message: 'Login realizado com sucesso!',
            role: user.role // Adicionando o papel aqui
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
});

module.exports = router;
