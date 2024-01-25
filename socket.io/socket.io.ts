import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const videoCall = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    const emailToSocketIdMap = new Map();
    const socketidToEmailMap = new Map();

    io.on("connection", (socket) => {
        console.log(`Socket Connected`, socket.id);

        socket.emit('welcome','hello this socket server')

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
} 

export default videoCall;
