const Joi= require('joi')
const express = require('express');
const db = require('./db')
const cors = require('cors');
const e = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
import { prisma } from './lib/prisma';

//função porteiro (Middlewares)

function verificarToken(req, res, next){
    const authHeader =req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pega apenas o código após "Bearer"

    if(!token){
        return res.status(401).json({error:'Acesso negado. Faça login para continuar.'});
    }

    try {
      // Valida o token usando sua chave mestra
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.usuarioId = decoded.id; //Salva o Id
      next();//pode seguir para a rota
    } catch (error) {
        res.status(403).json({error:'Token inválido ou expirado.'});
    }
}
app.use(cors()); // Permite que o Front-end acesse a API
app.use(express.json()); // Permite que a API entenda JSON

//Rota login
app.post('/login', async(req, res)=>{
    const {email, senha} = req.body;

    try {
        const user =await db('usuarios').where({email}).first();
        if(!user){
            return res.status(401).json({error:'Credenciais inválidas'})
        }

        //comparando as senha digitada co a o hash do banco.
        const senhavalida = await bcrypt.compare(senha, user.senha);

        if(!senhavalida){
            return res.status(401).json({error:'Credenciais inválidas'})
        }

        //Gerando o token
        const token = jwt.sign(
            {id:user.id,email:user.email},

            process.env.SECRET_KEY,{expiresIn:'1d'} //token valido por 1 dia
        );

        res.json({token, user: {nome: user.nome, email: user.email}});
    } catch (error) {
       console.error(error);
        res.status(500).json({ error: "Erro interno no servidor" }); 
    }
});


//Rota de registro
app.post('/register', async(req, res)=>{
    const {nome , email, senha} = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        await db('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada
        });
        res.status(201).json({message:"Usuário cadastrado com sucesso!"})
    } catch (error) {
       res.status(400).json({ error: "Erro ao cadastrar: Email talvez já exista." }); 
    }
});

// Rota 1: Listar todos os leads (O Dashboard vai usar essa)
app.get('/leads', verificarToken, async (req, res) => {

   const { nome, email, whatsapp, origem, notas } = req.body;
    
   try {
    const novoLeads = await prisma.lead.create({
        data:{ 
        nome,
        email,
        whatsapp,
        origem: origem || 'Site',
        notas: notas || '',
        status: 'pendente'
        }
    });
    res.status(201).json(novoLeads);
   } catch (error) {
    res.status(400).json({error:'Erro ao cadastrar: E-mail já existe ou dados inválidos.'});
   }    
});

// Rota 3: Editar Status do Lead

app.patch('/leads/:id', verificarToken, async (req, res)=>{
   try{
    const {id} = req.params;
    const {status} = req.body

    const atualizado = await prisma.lead.update({ 
        where:{
            id: Number(id),
            usuarioId: req.usuarioId
        },
        data:{status}
    });

    if(!atualizado){
        return res.status(404).json({error:"Lead não encontrado no banco"});
    }
    res.json({messge:"Status atualizado com sucesso!"});

    } catch(error){
        res.status(500).json({ error: "Erro ao atualizar no banco" });
    }
});

// Rota 4: Deletar Lead
app.delete('/leads/:id', verificarToken, async (req, res) => {
try{
    const { id } = req.params;

    const deletado = await prisma.lead.deleteMany({
        where:{
            id: Number(id),
            usuarioId: req.usuarioId
        }
    })

        if (deletado) {
           return res.json({ message: "Lead removido com sucesso!" });
        } else{
           return res.status(404).json({ error: "Lead não encontrado ou sem permissão" });
        }
       return res.status(204).send(); // Sucesso sem conteúdo

    } catch (error) {
       return res.status(500).json({ error: "Erro ao excluir do banco" });
    }
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});