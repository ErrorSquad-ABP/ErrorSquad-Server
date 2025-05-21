require("dotenv").config(); // Carrega variáveis de ambiente
const express = require("express");
const { initializeSocket } = require('./socket'); 
const cors = require("cors");
const http = require("http");
const app = express();
const PORT = process.env.PORT;

const corsOptions = {
    origin: ['https://placeholder-front.onrender.com', 'http://localhost:3000'], // Substitua pela origem permitida
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

// Cria o servidor HTTP
const server = http.createServer(app);

// Inicializa o Socket.IO
initializeSocket(server, corsOptions);

// Inicia o servidor na porta especificada
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});