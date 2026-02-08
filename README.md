# 🚀 Gerenciador de Leads - Fullstack

Este é um sistema de gerenciamento de leads desenvolvido para um projeto de freelance. Ele permite cadastrar, listar, atualizar o status e excluir leads de forma simples e eficiente.

## 🛠️ Tecnologias Utilizadas

### **Backend**
* **Node.js**: Ambiente de execução.
* **Express**: Framework para criação da API.
* **SQLite / Knex**: Banco de dados e Query Builder para persistência de dados.
* **CORS**: Para permitir a comunicação com o Frontend.

### **Frontend**
* **React**: Biblioteca para construção da interface.
* **Vite**: Ferramenta de build rápida.
* **Axios**: Para consumo da API.
* **Lucide React**: Biblioteca de ícones (Check, Trash, etc).

## 📋 Funcionalidades
- [x] Cadastro de leads (Nome, Email, WhatsApp).
- [x] Listagem em tempo real.
- [x] Alteração de status (Pendente para Finalizado).
- [x] Exclusão de leads com confirmação.

## 🔧 Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/WellintonRodrigo/freelance-leadtrack

   .Configurando o Backend:

'cd backend'
'npm install'
'node server.js'

.O banco de dados SQLite será criado automaticamente na primeira execução.

.Configurando o Frontend:

'cd ../frontend'
'npm install'
'npm run dev'

## Este projeto está sob a licença MIT.