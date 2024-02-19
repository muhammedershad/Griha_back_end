import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const chat = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    
    let users: { userId: any; socketId: any; }[] = []

    const addUser = (userId: any, socketId: string) => {
        console.log("here")
        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId})
    }

    const removeUser = (socketId: string) => {
        users = users.filter(user => user.socketId !== socketId)
    }

    const getUsers = (userId: any) => {
        return users.find(user => user.userId === userId)
    }

    io.on("connection", (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
        console.log('a user connected!!!!')

        socket.on('addUser', (userId) => {
            console.log('a user', userId) 
            addUser(userId, socket.id) 
            io.emit('getUsers', users)
        })

        socket.on('disconnect', () => {
            console.log('somebody disconnected')
            removeUser(socket.id)
            io.emit('getUsers', users)
        })

        socket.on('sendMessage', ({senderId, receiverId, text}) => {
            console.log(senderId, receiverId, text)
            const user = getUsers(receiverId)
            console.log(text,user );
            
            io.to(user?.socketId).emit('getMessage', {
                senderId,
                text
            })
        })
    });
} 

export default chat;
