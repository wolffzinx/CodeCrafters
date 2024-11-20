// models/Ranking.js
const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    score: { type: Number, required: true }
});

module.exports = mongoose.model('Ranking', rankingSchema);
