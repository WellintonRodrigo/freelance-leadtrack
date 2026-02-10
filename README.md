# 🚀 Gerenciador de Leads - Fullstack

Este é um sistema de gerenciamento de leads, ele permite cadastrar, listar, atualizar o status e excluir leads de forma simples e eficiente.

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
*  **Dashboard de Estatísticas**: Cards com contagem automática de leads totais, pendentes e finalizados.
*  **Conexão Direta WhatsApp**: Clique no número para abrir a conversa instantaneamente com o código do país automático.
*  **Notificações Toast**: Feedback visual elegante para cada ação (cadastro, atualização e exclusão).

## 📋 Funcionalidades
- [x] Cadastro de leads (Nome, Email, WhatsApp).
- [x] Listagem em tempo real.
- [x] Alteração de status (Pendente para Finalizado).
- [x] Exclusão de leads com confirmação.

## 🔧 Como Rodar o Projeto

1. **Clone o repositório:**
    https://github.com/WellintonRodrigo/freelance-leadtrack

Siga os passos abaixo para configurar o ambiente local.

---

### 🔙 1. Configurando o Backend
Entre na pasta do servidor e instale as dependências:
```bash
cd backend
npm install
node server.js
```
O banco de dados SQLite será criado automaticamente na primeira execução.
### 💻 2. Configurando o Frontend
Abra um novo terminal e inicie o Vite:
```bash
cd frontend
npm install
npm run dev
```

## Este projeto está sob a licença MIT.
