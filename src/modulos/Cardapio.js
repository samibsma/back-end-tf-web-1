import { Router } from "express";
import pool from "../db/conexao.js";

const rotasCardapio = Router();

// Rota para pesquisar todos cardapios da tabela.
rotasCardapio.get("/cardapio", async (request, response) => {
  try {
    const sql = "SELECT * FROM cardapio;";
    const resultado = await pool.query(sql);

    // Verificando se existe algum cardapio na tabela.
    if (resultado.rows.length > 0) {
      response.status(200).json(resultado.rows);
    } else {
      response.status(404).json("Nenhum cardápio encontrado");
    }
  } catch (erro) {
    console.error("Erro ao buscar cardápios:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

// Rota para pesquisar cardapios da tabela por Id.
rotasCardapio.get("/cardapio/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const sql = "SELECT * FROM cardapio WHERE id = $1;";
    const resultado = await pool.query(sql, [id]);

    if (resultado) {
      response.status(200).json(resultado.rows[0]);
    } else {
      response.status(404).json({
        mensagem: "Nenhum cardápio encontrado com o ID fornecido",
      });
    }
  } catch (erro) {
    console.error("Erro ao buscar cardápio por ID:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

// Rota para criar um cardápio
rotasCardapio.post("/cardapio", async (request, response) => {
  try {
    const { Dia_da_semana, Itens_Cafe_Da_Manha, Itens_Almoco, Itens_Jantar } =
      request.body;
    //Verifica se todos os campos obrigatórios
    if (
      !Dia_da_semana ||
      !Itens_Cafe_Da_Manha ||
      !Itens_Almoco ||
      !Itens_Jantar
    ) {
      return response
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }

    // Valores para serem inseridos no banco de dados e usando o RETURNING * para facilitar na hora de retornar o cardapio criado.
    const sql =
      "INSERT INTO cardapio (Dia_da_semana, Itens_Cafe_Da_Manha, Itens_Almoco, Itens_jantar) VALUES ($1, $2, $3, $4) RETURNING *;";
    const valoresInseridos = [
      Dia_da_semana,
      Itens_Cafe_Da_Manha,
      Itens_Almoco,
      Itens_Jantar,
    ];
    const resultado = await pool.query(sql, valoresInseridos);
    //Pegando o que foi inserido para mostrar.
    const cardapio = resultado.rows[0];
    response.status(201).json(cardapio);
  } catch (erro) {
    console.error("Erro ao criar cardápio:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

// Rota para deleter um cardapio pelo id.
rotasCardapio.delete("/cardapio/:id", async (request, response) => {
  try {
    const id = request.params.id;
    // Usando o RETURNING * para facilitar na hora de retornar o cardapio excluido.
    const sql = "DELETE FROM cardapio WHERE id = $1 RETURNING *;";
    const resultado = await pool.query(sql, [id]);

    // Usando o rows para pegar o primeiro cardapio.
    if (resultado.rows[0]) {
      response.status(200).json({
        mensagem: "Cardápio deletado com sucesso",
        cardapioDeletado: resultado.rows[0],
      });
    } else {
      response.status(404).json({
        mensagem: "Nenhum cardápio encontrado com o ID fornecido",
      });
    }
  } catch (erro) {
    console.error("Erro ao deletar cardápio por ID:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

// Rota para atualizar um cardapio pelo id.
rotasCardapio.put("/cardapio/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const { Dia_da_semana, Itens_Cafe_Da_Manha, Itens_Almoco, Itens_Jantar } =
      request.body;

    const sql =
      "UPDATE cardapio SET Dia_da_semana = $1, Itens_Cafe_Da_Manha = $2, Itens_Almoco = $3, Itens_Jantar = $4 WHERE id = $5 RETURNING *;";
    const resultado = await pool.query(sql, [
      Dia_da_semana,
      Itens_Cafe_Da_Manha,
      Itens_Almoco,
      Itens_Jantar,
      id,
    ]);

    if (resultado.rows.length > 0) {
      response.status(200).json({
        mensagem: "Cardápio atualizado com sucesso",
        cardapioAtualizado: resultado.rows[0],
      });
    } else {
      response.status(404).json({
        mensagem: "Nenhum cardápio encontrado com o ID fornecido",
      });
    }
  } catch (erro) {
    console.error("Erro ao atualizar cardápio por ID:", erro);
    response.status(500).json("Erro interno do servidor");
  }
});

export default rotasCardapio;
