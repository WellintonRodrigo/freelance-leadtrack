const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); // Permite que o Front-end acesse a API
app.use(express.json()); // Permite que a API entenda JSON

// Rota de teste
app.get('/', (req, res) => {
    res.send('API do LeadTrack rodando com sucesso!');
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});