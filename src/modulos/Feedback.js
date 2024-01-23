import { Router } from "express";
import pool from "../db/conexao.js";

const rotasFeedback = Router();

// Rota para criar um feedback de um cardapio via id, o id passado é o do cardapio.
rotasFeedback.post("/feedback/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const { Nota } = request.body;

    if (!Nota) {
      return response.status(400).json({ mensagem: "A nota é obrigatória" });
    }

    const sql =
      "INSERT INTO feedback (Nota, fk_Cardapio_id) VALUES ($1, $2) RETURNING *";
    const feedback = [Nota, id];

    const resultado = await pool.query(sql, feedback);

    if (resultado.rows.length > 0) {
      response.status(201).json({
        mensagem: "Feedback criado com sucesso",
        feedbackCriado: resultado.rows[0],
      });
    } else {
      response.status(500).json("Erro ao criar feedback");
    }
  } catch (erro) {
    console.error("Erro ao processar a requisição:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

// Rota para listar todos os feedbacks.
rotasFeedback.get("/feedback", async (request, response) => {
  try {
    const sql =
          "SELECT feedback.*, cardapio.Dia_da_semana, cardapio.Itens_Cafe_Da_Manha, cardapio.Itens_Almoco, cardapio.Itens_jantar FROM Feedback feedback INNER JOIN Cardapio cardapio ON feedback.fk_Cardapio_id = cardapio.id";

    const resultado = await pool.query(sql);

    if (resultado.rows.length > 0) {
      response.status(200).json(resultado.rows);
    } else {
      response.status(404).json("Nenhum feedback encontrado");
    }
  } catch (erro) {
    console.error("Erro ao buscar feedbacks:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

// Rota para deleter um feedback pelo id.
rotasFeedback.delete("/feedback/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const sql = "DELETE FROM feedback WHERE id = $1 RETURNING *";

    const resultado = await pool.query(sql, [id]);

    if (resultado.rows[0]) {
      response.status(200).json({
        mensagem: "Feedback deletado com sucesso",
        feedbackDeletado: resultado.rows[0],
      });
    } else {
      response.status(404).json("Feedback não encontrado");
    }
  } catch (erro) {
    console.error("Erro ao excluir feedback:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

export default rotasFeedback;
