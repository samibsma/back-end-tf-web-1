import pool from "../conexao.js";

// Criar tabela do cardápio elephant sql, para criar tabela digite no terminal node src/db/tabelas/tabelaCardapio.js
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS cardapio (
    id SERIAL PRIMARY KEY,
    Dia_da_semana VARCHAR(100),
    Itens_Cafe_Da_Manha VARCHAR(255),
    Itens_Almoco VARCHAR(255),
    Itens_Jantar VARCHAR(255)
  );
`;

// Função para executar a criação da tabela
async function createCardapioTable() {
  const client = await pool.connect();

  try {
    await client.query(createTableQuery);
    console.log("Tabela do cardápio criada com sucesso!");
  } finally {
    client.release();
  }
}

// Chamando a função para criar a tabela do cardápio
createCardapioTable().catch((err) => console.error(err));
