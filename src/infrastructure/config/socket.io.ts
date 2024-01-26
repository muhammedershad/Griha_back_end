import http from "http";
import { Server, Socket } from "socket.io";
import videoCall from "../../../socket.io/socket.io";
import chat from "../../../socket.io/chat";

const configureSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
        transports: ["websocket", "polling"],
        maxHttpBufferSize: 5 * 1024 * 1024,
    });

    videoCall(io)
    chat(io)

    return io;
};

export default configureSocket;
