require("dotenv").config(); // Carrega variáveis de ambiente
const express = require("express");

const app = express();
const PORT = process.env.PORT;

// Importa rotas
const routes = require("./routes");

// Middleware para processar JSON
app.use(express.json());

// Configuração das rotas
app.use("/", routes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
