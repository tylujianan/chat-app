import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const shakeClass = message.shouldShake ? 'shake' : ''
    return (
        <div className={`chat ${fromMe ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble rounded-full text-white ${fromMe ? 'bg-blue-500' : 'bg-slate-800'} ${shakeClass}`}>{message.message}</div>
            <div className="chat-footer opacity-50 mt-1 text-gray-300">{formattedTime}</div>
        </div>
    )
}

export default Message
