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
io.on("connection", (socket) => { // Listen for incoming connections from clients. When a client connects, the callback function is executed. The socket object represents the connection between the server and the client.
    console.log("a user connected", socket.id); // Log a message to the console indicating that a client has connected to the server.
    socket.on("disconnect", (userData) => { // Listen for the "setup" event from the client. When the "setup" event is emitted by the client, the callback function is executed. The userData object contains information about the user.
        console.log("a user disconnected", socket.id); // Log a message to the console indicating that a client has disconnected from the server.  
    })
})
export {
    app,
    io,
    server
}