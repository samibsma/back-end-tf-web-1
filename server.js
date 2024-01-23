import app from "./src/app.js";

// Usamos nodemon para  executar o servidor de forma automatica.
// Porta para executar o servidor
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
