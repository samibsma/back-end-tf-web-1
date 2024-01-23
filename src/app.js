import express from "express";
import rotasCardapio from "./modulos/Cardapio.js";
import rotasUsuarios from "./modulos/Usuarios.js";
import rotasFeedback from "./modulos/Feedback.js";

const app = express();

// Leitura de de json.
app.use(express.json());

// Rota padrão da api.
app.get("/", (request, response) => {
  response.send("Api cardapio digital ifnmg...");
});

// Rotas do cardapio.
app.use(rotasCardapio);

// Rotas para usuários.
app.use(rotasUsuarios);

// Rotas para feeback.
app.use(rotasFeedback);

export default app;
