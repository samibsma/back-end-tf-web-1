import jwt from "jsonwebtoken";
import infosAutenticacao from "./infosAutenticacao.js";

const { verify } = jwt;
// Middleware(função) para proteger as rotas que serão acessadas somente para usuário administrador.
const autenticado = async (request, response, next) => {
  // Pegando token dos headers(cabeçalho da requisição).
  const autenticaoHeaders = request.headers.authorization;
  if (!autenticaoHeaders) {
    return response.json({ mesagem: "Token não informado" });
  }

  const [Bearer, token] = autenticaoHeaders.split(" ");

  try {
    const TokenDecodificado = verify(token, infosAutenticacao.jwt.secret);

      const { sub } = TokenDecodificado;
      
    //Passando id do usuario para a rota
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    return response.status(401).json({ mesagem: "Token inválido" });
  }
};

export default autenticado;
