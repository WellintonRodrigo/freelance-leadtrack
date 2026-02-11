#  LeadTrack - Fullstack CRM
Sistema completo de gerenciamento de leads com dashboard de estatísticas, autenticação segura e notificações em tempo real.
## 🛠️ Tecnologias Utilizadas

### **Backend**
* **Node.js**: Ambiente de execução.
* **Express**: Framework para criação da API.
* **SQLite / Knex**: Banco de dados e Query Builder para persistência de dados.
* **CORS**: Para permitir a comunicação com o Frontend.
* **JWT (JSON Web Token)**: Autenticação segura de rotas.
* **Bcrypt**: Criptografia de senhas para segurança máxima.
* **Dotenv**: Gerenciamento de variáveis de ambiente.

### **Frontend**
* **React**: Biblioteca para construção da interface.
* **Vite**: Ferramenta de build rápida.
* **Axios**: Para consumo da API.
* **Lucide React**: Biblioteca de ícones (Check, Trash, etc).
*  **Dashboard de Estatísticas**: Cards com contagem automática de leads totais, pendentes e finalizados.
*  **Conexão Direta WhatsApp**: Clique no número para abrir a conversa instantaneamente com o código do país automático.
*  **Notificações Toast**: Feedback visual elegante para cada ação (cadastro, atualização e exclusão).
* **Tailwind CSS v4**: Estilização de alta produtividade.

## Segurança Implementada
* **Senhas Hash**: Armazenamento seguro no banco de dados.
* **Tokens de Acesso**: Sessões de usuário validadas via JWT.
* **Variáveis Protegidas**: Chaves de API e portas configuradas via .env.

## 📋 Funcionalidades
- [x] Cadastro de leads (Nome, Email, WhatsApp).
- [x] Tela de login.
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
Crie um arquivo .env e defina sua SECRET_KEY e PORT.
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
