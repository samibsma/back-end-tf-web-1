import pool from "../conexao.js";

// Criar tabela do feedBack elephant sql, para criar tabela digite no terminal node src/db/tabelas/tabelaFeedback.js.
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    Nota FLOAT,
    fk_Cardapio_id INTEGER,
    CONSTRAINT FK_Feedback_1
      FOREIGN KEY (fk_Cardapio_id) 
      REFERENCES Cardapio (id) 
      ON DELETE CASCADE
  );
`;

// Função para executar a criação da tabela
async function createFeedbackTable() {
  const client = await pool.connect();

  try {
    await client.query(createTableQuery);
    console.log("Tabela feedback criada com sucesso!");
  } finally {
    client.release();
  }
}

// Chamando a função para criar a tabela do cardápio
createFeedbackTable().catch((err) => console.error(err));
