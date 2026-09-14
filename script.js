// server.js (Node.js + Socket.io qisqartirilgan namunasi)
const io = require('socket.io')(3000, { cors: { origin: "*" } });

const rooms = {};

io.on('connection', (socket) => {
    socket.on('joinGame', ({ roomId, userId }) => {
        if (!rooms[roomId]) rooms[roomId] = [];
        
        if (rooms[roomId].length < 4) {
            rooms[roomId].push({ id: socket.id, userId });
            socket.join(roomId);
            
            // Xonada 4 kishi to'planganda o'yinni boshlash
            if (rooms[roomId].length === 4) {
                io.to(roomId).emit('startGame', { players: rooms[roomId] });
            }
        }
    });

    socket.on('rollDice', ({ roomId }) => {
        const diceValue = Math.floor(Math.random() * 6) + 1;
        io.to(roomId).emit('diceRolled', { diceValue, player: socket.id });
    });
});