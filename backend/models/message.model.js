import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 发送者的ID，关联到User模型
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 接收者的ID，关联到User模型
    message: { type: String, required: true }, // 消息内容
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema);

export default Message;