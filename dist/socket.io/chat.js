"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat = (io) => {
    let users = [];
    const addUser = (userId, socketId) => {
        console.log("here");
        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId });
    };
    const removeUser = (socketId) => {
        users = users.filter(user => user.socketId !== socketId);
    };
    const getUsers = (userId) => {
        return users.find(user => user.userId === userId);
    };
    io.on("connection", (socket) => {
        console.log('a user connected!!!!');
        socket.on('addUser', (userId) => {
            console.log('a user', userId);
            addUser(userId, socket.id);
            io.emit('getUsers', users);
        });
        socket.on('disconnect', () => {
            console.log('somebody disconnected');
            removeUser(socket.id);
            io.emit('getUsers', users);
        });
        socket.on('sendMessage', ({ senderId, receiverId, text }) => {
            const user = getUsers(receiverId);
            io.to(user === null || user === void 0 ? void 0 : user.socketId).emit('getMessage', {
                senderId,
                text
            });
        });
    });
};
exports.default = chat;
