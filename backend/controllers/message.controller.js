import Coversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; // Get the conversation ID from the URL parameters
        const senderId = req.user._id; // Get the sender ID from the authenticated user

        let conversation = await Coversation.findOne({
            participants: { $all: [senderId, receiverId] } // Find the conversation between the sender and receiver
        })

        if (!conversation) { // If the conversation does not exist, create a new one
            conversation = await Coversation.create({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = new Message({ // Create a new message object with the sender ID, message content, and timestamp
            senderId,
            message,
            receiverId,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id); // Add the new message to the conversation's messages array
        }

        await Promise.all[conversation.save(), newMessage.save()];

        res.status(201).json([newMessage]); // Return a success message
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: error.message });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id; // Get the sender ID from the authenticated user
        const conversation = await Coversation.findOne({ // Find the conversation between the sender and receiver
            participants: { $all: [senderId, userToChatId] } // Find the conversation between the sender and receiver
        }).populate("messages"); // Populate the messages array with the actual message objects
        if (!conversation) { // If the conversation does not exist, return a 404 error message
            return res.status(404).json({ message: "Conversation not found" });
        }

        const messages = conversation.messages; // Get the messages array from the conversation object

        res.status(200).json(conversation.messages); // Return the conversation object as a respons
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: error.message });
    }
}