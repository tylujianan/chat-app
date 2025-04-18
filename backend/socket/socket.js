import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app); // Create an HTTP server using Express app
const io = new Server(server, { // Create a new Socket.IO server instance, passing the HTTP server and options object as arguments.
    cors: { // Configure CORS settings for the Socket.IO server.
        origin: ["http://localhost:3000"],// Allow requests from this origin.
        methods: ["GET", "POST"], // Allow these HTTP methods.
    }
})

export const getReceiverSocketId = (receiverId) => { // Define a function that takes a receiverId as an argument and returns the corresponding socket.id. This function is used to get the socket.id of the receiver so that the server can send messages to the correct client.
    return userSocketMap[receiverId]; // Return the socket.id of the receiver from the userSocketMap.
}

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => { // Listen for incoming connections from clients. When a client connects, the callback function is executed. The socket object represents the connection between the server and the client.
    console.log("a user connected", socket.id); // Log a message to the console indicating that a client has connected to the server.

    const userId = socket.handshake.query.userId; // Get the userId from the client's handshake query string. The userId is passed as a query parameter when the client connects to the server.
    if (userId != 'undefined') {
        userSocketMap[userId] = socket.id; // Store the userId and socket.id in the userSocketMap. This allows the server to keep track of which socket belongs to which user.
        // userSocketMap.set(userId, socket.id); // Store the userId and socket.id in the userSocketMap. This allows the server to keep track of which socket belongs to which user.
        io.emit('getOnlineUsers', Object.keys(userSocketMap)); // Emit a 'getOnlineUsers' event to all connected clients, passing the array of online user IDs as the event data. This allows the clients to update their UI to reflect the current online users.
        console.log("userSocketMap", userSocketMap); // Log the userSocketMap to the console.
    }
    socket.on("disconnect", (userData) => { // Listen for the "setup" event from the client. When the "setup" event is emitted by the client, the callback function is executed. The userData object contains information about the user.

        console.log("a user disconnected", socket.id); // Log a message to the console indicating that a client has disconnected from the server.  
        delete userSocketMap[userId]; // Remove the userId and socket.id from the userSocketMap. This allows the server to remove the user from the list of online users.
        io.emit('getOnlineUsers', Object.keys(userSocketMap)); // Emit a 'getOnlineUsers' event to all connected clients, passing the array of online user IDs as the event data. This allows the clients to update their UI to reflect the current online users.
    })
})
export {
    app,
    io,
    server
}