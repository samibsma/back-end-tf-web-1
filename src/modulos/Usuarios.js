import { Router } from "express";
import pool from "../db/conexao.js";

const rotasUsuarios = Router();

// Rota para listar todos os usuarios.
rotasUsuarios.get("/usuarios", async (request, response) => {
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
rotasUsuarios.get("/usuarios/:id", async (request, response) => {
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

// Rota para deleter um usuário pelo id.

rotasUsuarios.delete("/usuarios/:id", async (request, response) => {
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
rotasUsuarios.put("/usuarios/:id", async (request, response) => {
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

// Função para verificar se as informações estão iguais as informações do banco de dados
const verificarAutenticacao = async (request, response, next) => {
  try {
    const { Email, Senha } = request.body;

    if (!Email || !Senha) {
      return response
        .status(400)
        .json({ mensagem: "Email e senha são obrigatórios" });
    }

    // Sql para verificar se as informações do usuário existem no banco de dados
    const sql = "SELECT * FROM usuarios WHERE Email = $1 AND Senha = $2";
    const resultado = await pool.query(sql, [Email, Senha]);

    if (resultado.rows[0]) {
      // Usuário autenticado
      request.usuarioAutenticado = resultado.rows[0];
      //Next para passar para a rota.
      next();
    } else {
      // Usuário não autenticado
      return response.status(401).json({ mensagem: "Credenciais inválidas" });
    }
  } catch (erro) {
    console.error("Erro ao verificar autenticação:", erro);
    return response.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

// Rota para logar um usuario
rotasUsuarios.post("/login", verificarAutenticacao, (request, response) => {
  // Usuário autenticado(verificado pela função)
  const usuarioAutenticado = request.usuarioAutenticado;

  // Retornando informações do usuário autenticado.
  response.status(200).json({
    mensagem: "Login bem-sucedido",
    usuario: {
      id: usuarioAutenticado.id,
      Email: usuarioAutenticado.Email,
      Nome: usuarioAutenticado.Nome,
    },
  });
});

export default rotasUsuarios;
