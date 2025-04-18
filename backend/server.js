import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import { app, server } from './socket/socket.js'; // 假设你有一个 socket.js 文件来处理 WebSocket 连接和事件处理

import connectToMongoDB from './db/connectToMongoDB.js';

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve(); // Get the current directory path. This is used to set the path to the public directory. The public directory contains the static files such as HTML, CSS, and Jav

dotenv.config();

app.use(express.json()); // for parsing application/json from request body
app.use(cookieParser()); // for parsing cookies from request headers

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes); // 假设你有一个用户路由文件 user.routes.js 来处理用户相关的路由
// app.use("/api/conversations", conversationRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist'))); // Serve static files from the public directory. This is used to serve the index.html file when the user visits the root URL.

app.get('*', (req, res) => { // Serve the index.html file when the user visits any other URL. This is used to serve the index.html file when the user visits any other URL. The index.html file is the entry point for the React application.
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
})