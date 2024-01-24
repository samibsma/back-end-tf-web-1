import { Router } from "express";
import pool from "../db/conexao.js";
import jwt from "jsonwebtoken";
import infosAutenticacao from "../middlewares/infosAutenticacao.js";
import autenticado from "../middlewares/autenticado.js";

const rotasUsuarios = Router();
const { sign } = jwt;

// Rota para criar um usuário.
rotasUsuarios.post("/usuarios", async (request, response) => {
  try {
    const { Email, Senha, Nome } = request.body;
    
    if (!Email || !Senha || !Nome) {
      response
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
      return;
    }
    
    const usuario = [Email, Senha, Nome];
    const sql =
    "INSERT INTO usuarios (Email, Senha, Nome) VALUES ($1, $2, $3) RETURNING *";
    const resultado = await pool.query(sql, usuario);
    
    response.status(201).json({
      mensagem: "Usuário criado com sucesso",
      usuarioCriado: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao criar usuário:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

// Rota para logar um usuario
rotasUsuarios.post("/login",async (request, response) => {
  const { Email, Senha } = request.body;

  if (!Email || !Senha) {
    return response
      .status(400)
      .json({ mensagem: "Email e senha são obrigatórios" });
  }

  const sql = "SELECT * FROM usuarios WHERE Email = $1";
  const user = await pool.query(sql, [Email]);
  if (!user.rows[0]) {
    return response
      .status(400)
      .json({ mensagem: "Usuario não encontrado no banco de dados" });
  }
  // Desistruturando usuario que chega do banco de dados.
  const { id, email, senha, nome } = user.rows[0];

  //Verificando se as informações informadas são iguais as do banco de dados.
  if (email !== Email || senha !== Senha) {
    return response
      .status(401)
      .json({ mensagem: "Informações invalidas, Email ou Senha incorreto" });
  }

  const token = sign({}, infosAutenticacao.jwt.secret, {
    subject: String(id),
    expiresIn: infosAutenticacao.jwt.expiracao,
  });

  //Retornando usuário sem a senha.
  return response.json({
    user: {
      nome: nome,
      email: email,
    },
    token,
  });
});

// Rota para listar todos os usuarios.
rotasUsuarios.get("/usuarios", autenticado, async (request, response) => {
  try {
    const sql = "SELECT * FROM usuarios;";
    const resultado = await pool.query(sql);

    if (resultado.rows.length > 0) {
      response.status(200).json(resultado.rows);
    } else {
      response.status(404).json("Nenhum usuário encontrado");
    }
  } catch (erro) {
    console.error("Erro ao buscar usuários:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

// Rota para buscar o usuario por id.
rotasUsuarios.get("/usuarios/:id", autenticado,async (request, response) => {
  try {
    const id = request.params.id;
    const sql = "SELECT * FROM usuarios WHERE id = $1;";
    const resultado = await pool.query(sql, [id]);

    if (resultado.rows.length > 0) {
      response.status(200).json(resultado.rows[0]);
    } else {
      response.status(404).json({
        mensagem: "Nenhum usuário encontrado com o ID fornecido",
      });
    }
  } catch (erro) {
    console.error("Erro ao buscar usuário por ID:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});


// Rota para deleter um usuário pelo id.

rotasUsuarios.delete("/usuarios/:id", autenticado, async (request, response) => {
  try {
    const id = request.params.id;
    const sql = "DELETE FROM usuarios WHERE id = $1 RETURNING *";
    const resultado = await pool.query(sql, [id]);

    if (resultado.rows[0]) {
      response.status(200).json({
        mensagem: "Usuário deletado com sucesso",
        usuarioDeletado: resultado.rows[0],
      });
    } else {
      response.status(404).json("Usuário não encontrado");
    }
  } catch (erro) {
    console.error("Erro ao excluir usuário:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

// Rota para atualizar um usuário pelo id.
rotasUsuarios.put("/usuarios/:id",autenticado, async (request, response) => {
  try {
    const id = request.params.id;
    const { Email, Senha, Nome } = request.body;
    const sql =
      "UPDATE usuarios SET email = $1, senha = $2, nome = $3 WHERE id = $4 RETURNING *";
    const valoresAtualizados = [Email, Senha, Nome, id];
    const resultado = await pool.query(sql, valoresAtualizados);

    if (resultado.rows[0]) {
      response.status(200).json({
        mensagem: "Usuário atualizado com sucesso",
        usuarioAtualizado: resultado.rows[0],
      });
    } else {
      response.status(404).json("Usuário não encontrado");
    }
  } catch (erro) {
    console.error("Erro ao atualizar usuário:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});


export default rotasUsuarios;

