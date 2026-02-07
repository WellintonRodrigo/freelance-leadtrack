const Joi= require('joi')
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

    // Validação
   const schema = Joi.object({
        nome: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().min(10).required()
   });

const {error} = schema.validate(req.body);

if(error){
    return res.status(404).json({error: error.details[0].message});
}
const {nome, email, whatsapp}=req.body;

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

// Rota 3: Editar Status do Lead

app.patch('/leads/:id', (req, res)=>{
    const {id} = req.params
    const {status} = req.body

    const leadIndex =leads.findIndex(l=>l.id===parseInt(id))

    if(leadIndex === -1){
        return res.status(404).json({ error: "Lead não encontrado"});
    }
    // Atualiza apenas o status
    leads[leadIndex].status = status || leads[leadIndex].status;

    console.log(`Lead ${id} atualizado para: ${leads[leadIndex].status}`);
    res.json(leads[leadIndex]);
});

// Rota 4: Deletar Lead
app.delete('/leads/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = leads.length;
    
    leads = leads.filter(l => l.id !== parseInt(id));

    if (leads.length === initialLength) {
        return res.status(404).json({ error: "Lead não encontrado para exclusão." });
    }

    console.log(`Lead ${id} removido.`);
    res.status(204).send(); // 204 significa "Sucesso, mas sem conteúdo para retornar"
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});