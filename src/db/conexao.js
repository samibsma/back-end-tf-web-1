import pkg from "pg";

//Criando conexao com o banco de dados elephant sql
const { Pool } = pkg;
const connectionString =
  "postgres://xjvckrdf:AfzZhcILXgjFowUh5aSXUj700g4-OHtQ@babar.db.elephantsql.com/xjvckrdf";
const pool = new Pool({
  connectionString: connectionString,
});

export default pool;
