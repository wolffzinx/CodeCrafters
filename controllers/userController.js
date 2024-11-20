const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Adicione outras funções como login, etc.
