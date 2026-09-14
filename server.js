const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" } // Telegram yoki har qanday domendan ulanishga ruxsat
});

// O'yin xonalari va holati
const rooms = {};

io.on('connection', (socket) => {
    console.log('Yangi o\'yinchi ulandi:', socket.id);

    // Xonaga qo'shilish
    socket.on('joinRoom', ({ roomId, playerName }) => {
        socket.join(roomId);
        
        if (!rooms[roomId]) {
            rooms[roomId] = {
                players: [],
                turn: 0
            };
        }

        const room = rooms[roomId];

        // Maksimal 4 kishi qabul qilinadi
        if (room.players.length < 4) {
            const playerColor = ['Qizil', 'Yashil', 'Sariq', 'Ko\'k'][room.players.length];
            const playerIndex = room.players.length;

            room.players.push({
                id: socket.id,
                name: playerName || `O'yinchi ${playerIndex + 1}`,
                color: playerColor,
                index: playerIndex
            });

            // O'yinchiga o'z ma'lumotlarini yuborish
            socket.emit('playerAssigned', { playerIndex, color: playerColor });

            // Xonadagi barchaga yangilangan o'yinchilar ro'yxatini yuborish
            io.to(roomId).emit('updateRoom', room);
        } else {
            socket.emit('errorMsg', 'Xona to\'la!');
        }
    });

    // Zar tashlash hodisasi
    socket.on('rollDice', ({ roomId }) => {
        const room = rooms[roomId];
        if (!room) return;

        // Aniq o'ynayotgan navbat egasi zar tashlayotganini tekshirish
        const currentPlayer = room.players[room.turn];
        if (currentPlayer && currentPlayer.id === socket.id) {
            const diceValue = Math.floor(Math.random() * 6) + 1;

            // Navbatni keyingi o'yinchiga uzatish
            room.turn = (room.turn + 1) % room.players.length;

            // Natijani barcha 4 ta o'yinchiga bir vaqtda yuborish
            io.to(roomId).emit('diceRolledResult', {
                diceValue,
                nextTurn: room.turn,
                rolledBy: currentPlayer.color
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('O\'yinchi chiqib ketdi:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Ludo Server 3000-portda ishlamoqda...');
});