const { Server } = require('socket.io');
const { setIO } = require('./lib/io');

function initializeSocket(server, corsOptions) {

    const io = new Server(server, {
    cors: {
        origin: corsOptions.origin,
        methods: corsOptions.methods,
        credentials: true,
        allowedHeaders: corsOptions.allowedHeaders
    }
});
setIO(io);

    io.on('connection', (socket) => {
        console.log('Um cliente se conectou:', socket.id);

        socket.on("grade_updated", () => {
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
}

module.exports = { initializeSocket };
