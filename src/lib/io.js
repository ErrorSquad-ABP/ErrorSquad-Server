// ./socket.js
let io = null;

exports.setIO = function(socketIO) {
    io = socketIO;
};

exports.getIO = function() {
    return io;
};