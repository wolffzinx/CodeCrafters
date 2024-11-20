const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Declarado aqui
const rankingRoutes = require('./routes/ranking');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/codecrafters', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Usar as rotas
app.use('/api/auth', authRoutes); // Remover a duplicação
app.use('/api/ranking', rankingRoutes);
app.use('/api/users', userRoutes);
