import pool from "../conexao.js";

// Criar tabela do cardápio elephant sql, para criar tabela digite no terminal node src/db/tabelas/tabelaUsuarios.js.
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    Email VARCHAR(100) UNIQUE,
    Senha VARCHAR(20),
    Nome VARCHAR(70)
  );
`;

// Função para executar a criação da tabela
async function createUsuariosTable() {
  const client = await pool.connect();

  try {
    await client.query(createTableQuery);
    console.log("Tabela de usuario criada com sucesso!");
  } finally {
    client.release();
  }
}

// Chamando a função para criar a tabela do usuarios
createUsuariosTable().catch((err) => console.error(err));
