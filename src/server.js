require("dotenv").config(); // Carrega variáveis de ambiente
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { setIO } = require("./lib/socket");

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
    origin: ['https://gerenciamento-pedagogico.vercel.app', 'https://placeholder-front.onrender.com', 'http://localhost:3001'], // Substitua pela origem permitida
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


// Configuração do Socket.IO com as mesmas opções CORS
const io = new Server(server, {
    cors: {
        origin: corsOptions.origin,
        methods: corsOptions.methods,
        credentials: true,
        allowedHeaders: corsOptions.allowedHeaders
    }
});

// Configura a instância do IO para ser acessível em outros módulos
setIO(io);

io.on("connection", (socket) => {
    console.log("Cliente conectado via Socket.IO:", socket.id);

    // Você pode adicionar ouvintes específicos aqui se necessário
    socket.on("grade_updated", () => {
        // Lógica para enviar a grade atual imediatamente
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

// Inicia o servidor na porta especificada
server.listen(PORT, () => {
    console.log(`Servidor rodando na url http://localhost:${PORT}`);
});
