import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // 参与方的ID，关联到User模型，至少有两个
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: [] }], // 消息的ID，关联到Message模型，可选
}, { timestamps: true })

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;