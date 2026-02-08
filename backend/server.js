const Joi= require('joi')
const express = require('express');
const db = require('./db')
const cors = require('cors');
const e = require('express');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); // Permite que o Front-end acesse a API
app.use(express.json()); // Permite que a API entenda JSON



// Rota 1: Listar todos os leads (O Dashboard vai usar essa)
app.get('/leads', async (req, res) => {

    try{
        const leads = await db('leads').select('*');
        res.json(leads);
    } catch(error){
        console.error("Erro ao listar os leads:", error);
        res.status(500).json({error: "Erro os buscar dados"})
    }
});
// Rota 2: Receber novo lead (O Formulário vai usar essa)
app.post('/leads', async (req, res) => {
    try {
        // 1. Pegamos os dados PRIMEIRO
        const { nome, email, whatsapp } = req.body;

        // 2. Verificamos se eles existem (evita erros de undefined)
        if (!nome || !email) {
            return res.status(400).json({ error: "Nome e Email são obrigatórios" });
        }

        // 3. Salvamos no banco usando o db.
        const [id] = await db('leads').insert({ 
            nome, 
            email, 
            whatsapp, 
            status: 'Pendente' 
        });

        res.status(201).json({ id, nome, email, whatsapp, status: 'Pendente' });
    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ error: "Erro ao cadastrar no banco" });
    }
});

// Rota 3: Editar Status do Lead

app.patch('/leads/:id', async (req, res)=>{
   try{
    const {id} = req.params;
    const {status} = req.body

    const atualizado = await db('leads').where({id}).update({status});

    if(!atualizado){
        return res.status(404).json({error:"Lead não encontrado no banco"});
    }
    res.json({messge:"Status atualizado com sucesso!"});

    } catch(error){
        res.status(500).json({ error: "Erro ao atualizar no banco" });
    }
});

// Rota 4: Deletar Lead
app.delete('/leads/:id', async (req, res) => {
try{
    const { id } = req.params;

    const deletado = await db('leads').where({ id }).delete();

        if (!deletado) {
            return res.status(404).json({ error: "Lead não encontrado" });
        }
        res.status(204).send(); // Sucesso sem conteúdo

    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir do banco" });
    }
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});