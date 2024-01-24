# back-end-tf-web
Back-End do trabalho final da disciplina de WEB

Bianca Sâmi Martins Araújo
Laila Layssa Bispo de Oliveira
Layza Gabriela Ferreira dos Santos
Maria Luiza da Silva Santos
Sara de Jesus Oliveira 

Esse site é um cardápio para o refeitório do IF, nele os alunos conseguem visualizar diariamente oque será servido no refeitório, tanto no almoço quanto no café da manhã. Esse site possui 2 abas, a aba usúario onde o servidor altorizado loga no sitema (por meio de email e senha) e consegue editar, adicionar e atualizar o cardápio, assim como também pode visualizar os feedbaks dos alunos.  E a aba visitante, que são os alunos que através de um link podem acessar e visualizar o cardápio do refeitório, assim como também podem escrever feedbacks em relação a comida.

<a href='db/modeloconceitual.jpg'>MODELO CONCEITUAL</a>

<a href='db/modelologico.jpg'>MODELO LÓGICO</a>

<a href='db/DDl.sql'>MODELO FÍSICO</a>

As ferramentas BrModelo e elephantSql(extensão do postgress online e gratis) foram utilizadas para auxiliar na realização da atividade e também na integração com o Banco de Dados, e outras ferramentas como node.js, express, jwt e pg para fazer a conexão e manipulacao do banco de dados.
## Rotas para Usuários

### Listar Usuários (GET)

- **Rota:** `https://back-end-tf-web-three.vercel.app/usuarios/`
- **Descrição:** Retorna a lista de todos os usuários cadastrados.
- **Observação:** É necessario que o usuário esteja cadastrado e logado.
### Obter Usuário por ID (GET)

- **Rota:** `https://back-end-tf-web-three.vercel.app/usuarios/{id}`
- **Descrição:** Retorna as informações de um usuário específico com base no ID fornecido.
- **Observação:** É necessario que o usuário esteja cadastrado e logado.
### Atualizar Usuário por ID (PUT ou PATCH)

- **Rota:** `https://back-end-tf-web-three.vercel.app/usuarios/{id}`
- **Descrição:** Atualiza as informações de um usuário específico com base no ID fornecido.
- **Observação:** É necessario que o usuário esteja cadastrado e logado.
### Deletar Usuário por ID (DELETE)

- **Rota:** `https://back-end-tf-web-three.vercel.app/usuarios/{id}`
- **Descrição:** Deleta um usuário específico com base no ID fornecido.
- **Observação:** É necessario que o usuário esteja cadastrado e logado.
### Criar Usuário (POST)

- **Rota:** `https://back-end-tf-web-three.vercel.app/usuarios`
- **Descrição:** Cria um novo usuário.
- **Body**:
```json
  {
    "Email": "layza@gmail.com",
    "Senha": "12345",
    "Nome": "layza Ferreira"
  }
```

### Login do Usuário (POST)

- **Rota:** `https://back-end-tf-web-three.vercel.app/login`
- **Descrição:** Realiza o login do usuário.
- **Body**
  ```json
    {
      "Email": "layza@gmail.com",
      "Senha": "12345",
    }
  ```
 - **Headers**:
 ```json
    {
      "Authorization": "Bearer TOKEN",
    }
```

## Rotas para Cardápio:
### Listar Cardápios (GET)

- **Rota:** `https://back-end-tf-web-three.vercel.app/cardapio/`
- **Descrição:** Retorna a lista de todos os cardápios disponíveis.

### Obter Cardápio por ID (GET)

- **Rota:** `https://back-end-tf-web-three.vercel.app/cardapio/{id}`
- **Descrição:** Retorna um cardápio específico com base no ID fornecido.

### Atualizar Cardápio por ID (PUT)

- **Rota:** `https://back-end-tf-web-three.vercel.app/cardapio/{id}`
- **Descrição:** Atualiza as informações de um cardápio específico com base no ID fornecido.
- **Observação:** É necessario que o usuário esteja cadastrado e logado.
### Deletar Cardápio por ID (DELETE)

- **Rota:** `https://back-end-tf-web-three.vercel.app/cardapio/{id}`
- **Descrição:** Deleta um cardápio específico com base no ID fornecido.
- **Observação:** É necessario que o usuário esteja cadastrado e logado.
### Criar Cardápio (POST)

- **Rota:** `https://back-end-tf-web-three.vercel.app/cardapio`
- **Descrição:** Cria um novo cardápio.
- **Observação:** É necessario que o usuário esteja cadastrado e logado.
- **Body**:
```json
  {
    "Dia_da_semana": "segunda-feira",
    "Itens_Cafe_Da_Manha": "cafe, pão e biscoito",
    "Itens_Almoco": "carne de bovina, arroz, feijao e batata",
    "Itens_Jantar": "carne de suina, arroz, feijao e macarrão"
  }
```

 ## Rotas para Feedback

### Listar Feedbacks (GET)

- **Rota:** `https://back-end-tf-web-three.vercel.app/feedback/`
- **Descrição:** Retorna a lista de todos os feedbacks cadastrados.

### Deletar Feedback por ID (DELETE)

- **Rota:** `https://back-end-tf-web-three.vercel.app/feedback/{id}`
- **Descrição:** Deleta um feedback específico com base no ID fornecido.

### Criar Feedback (POST)

- **Rota:** `https://back-end-tf-web-three.vercel.app/feedback/{id}`
- **Descrição:** Cria um novo feedback, associado ao cardápio com o ID fornecido como parâmetro.
- **Body**:
  ```json
  {
    "Nota": 10
  }
