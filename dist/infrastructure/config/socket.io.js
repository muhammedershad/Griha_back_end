"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socket_io_2 = __importDefault(require("../../socket.io/socket.io"));
const chat_1 = __importDefault(require("../../socket.io/chat"));
const configureSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
        transports: ["websocket", "polling"],
        maxHttpBufferSize: 5 * 1024 * 1024,
    });
    (0, socket_io_2.default)(io);
    (0, chat_1.default)(io);
    return io;
};
exports.default = configureSocket;
