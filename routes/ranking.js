// routes/ranking.js
const express = require('express');
const router = express.Router();
const Ranking = require('../models/Ranking');

// Rota para obter todos os rankings
router.get('/', async (req, res) => {
    try {
        const rankings = await Ranking.find().populate('userId', 'username'); // Popula o username do usuário
        res.json(rankings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para adicionar um novo ranking
router.post('/', async (req, res) => {
    const { userId, score } = req.body;
    const ranking = new Ranking({ userId, score });

    try {
        const savedRanking = await ranking.save();
        res.status(201).json(savedRanking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
