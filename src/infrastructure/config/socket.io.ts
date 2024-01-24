import http from "http";
import { Server, Socket } from "socket.io";

const configureSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
        transports: ["websocket", "polling"],
        maxHttpBufferSize: 5 * 1024 * 1024,
    });

    const emailToSocketIdMap = new Map();
    const socketidToEmailMap = new Map();

    io.on("connection", (socket) => {
        console.log(`Socket Connected`, socket.id);

        socket.on("room:join", (data) => {
            const { email, room } = data;
            emailToSocketIdMap.set(email, socket.id);
            socketidToEmailMap.set(socket.id, email);
            io.to(room).emit("user:joined", { email, id: socket.id });
            socket.join(room);
            io.to(socket.id).emit("room:join", data);
        });

        socket.on("user:call", ({ to, offer }) => {
            console.log(to,'to', offer,'offer')
            io.to(to).emit("incomming:call", { from: socket.id, offer });
        });

        socket.on('call:accepted', ({ to, ans }) => {
            io.to(to).emit("call:accepted", { from: socket.id, ans });
        })

        socket.on('peer:nego:needed', ({ to, offer }) => {
            io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
        })

        socket.on('peer:nego:done', ({ to, ans }) => {
            io.to(to).emit("peer:nego:final", { from: socket.id, ans });
        } )
    });

    return io;
};

export default configureSocket;
