console.log("-> O arquivo db.js foi carregado com sucesso!");

const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: "./dev.sqlite3"
  },
  useNullAsDefault: true
});

db.schema.hasTable('leads').then((exists) => {
  if (!exists) {
    console.log("-> Criando tabela de leads...");
    return db.schema.createTable('leads', (table) => {
      table.increments('id');
      table.string('nome');
      table.string('email');
      table.string('whatsapp');
      table.string('status').defaultTo('Pendente');
    });
  }
}).catch(err => console.log("Erro no Knex:", err));

// Criar tabela de usuários se não existir
db.schema.hasTable('usuarios').then((exists) => {
  if (!exists) {
    console.log("→ Criando tabela de usuários...");
    return db.schema.createTable('usuarios', (table) => {
      table.increments('id');
      table.string('nome').notNullable();
      table.string('email').unique().notNullable(); // Email único para login
      table.string('senha').notNullable();
    });
  }
}).catch(err => console.log("Erro ao criar tabela de usuários:", err));

module.exports = db;