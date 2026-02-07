const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); // Permite que o Front-end acesse a API
app.use(express.json()); // Permite que a API entenda JSON

let leads = [ {
    id: 1,
    nome: "Cliente teste",
    email:"teste@gmail.com",
    whatsapp: "11999999999", 
    status: "Pendente"}
];
// Rota 1: Listar todos os leads (O Dashboard vai usar essa)
app.get('/leads', (req, res) => {
    res.send(leads);
});
// Rota 2: Receber novo lead (O Formulário vai usar essa)
app.post('/leads', (req, res)=>{
    const {nome, email, whatsapp}= req.body;
    // Validação
    if(!nome || !email || !whatsapp){
    return res.status(400).json({error:"Todos os campos são obrigatórios."});
 }

const novoLead = {
        id: leads.length + 1,
        nome,
        email,
        whatsapp,
        status: "Pendente"
    };

    leads.push(novoLead);
    console.log("Novo lead recebido:", novoLead);
    res.status(201).json(novoLead);
});   

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});