require("dotenv").config(); // Carrega variáveis de ambiente
const express = require("express");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Substitua pela origem permitida
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

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
