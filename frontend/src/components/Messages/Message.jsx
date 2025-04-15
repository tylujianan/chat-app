const Message = ({ avatar, content, time, isSent }) => {
    return (
        <div className={`chat ${isSent ? 'chat-start' : 'chat-end'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={avatar} />
                </div>
            </div>
            <div className={`chat-bubble rounded-full shake text-white ${isSent ? 'bg-slate-800' : 'bg-blue-500'}`}>{content}</div>
            <div className="chat-footer opacity-50 mt-1 text-gray-300">{time}</div>
        </div>
    )
}

export default Message
