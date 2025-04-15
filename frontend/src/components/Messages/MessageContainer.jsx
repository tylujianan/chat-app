import MessageInput from "./MessageInput"
import Messages from "./Messages"

const MessageContainer = () => {
    return (
        <div className="md:min-w-[600px] flex flex-col relative">
            <div className="w-full h-10 pl-2 flex text-sm items-center bg-slate-500"><span>To:&nbsp;</span><span className="text-xl text-gray-900 font-bold">Jianan Lu</span></div>
            <Messages />
            <MessageInput />
        </div>
    )
}

export default MessageContainer
