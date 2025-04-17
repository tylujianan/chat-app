import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
// import conversationRoutes from './routes/conversation.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(express.json()); // for parsing application/json from request body
app.use(cookieParser()); // for parsing cookies from request headers

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes); // 假设你有一个用户路由文件 user.routes.js 来处理用户相关的路由
// app.use("/api/conversations", conversationRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
})