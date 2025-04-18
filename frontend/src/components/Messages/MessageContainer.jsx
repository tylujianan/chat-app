import { useEffect } from "react";
import useConversation from "../../zustand/useConversation"
import { useAuthContext } from "../../context/AuthContext";
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { Icon } from "@iconify/react/dist/iconify.js";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    useEffect(() => {
        return () => {
            setSelectedConversation(null)
        }
    }, [setSelectedConversation])
    return (
        <div className="md:min-w-[600px] pb-10 flex flex-col relative">
            {
                !selectedConversation ? <NoChatSelected />
                    :
                    <>
                        <div className="w-full h-12 pl-2 flex absolute text-sm items-center z-50 shadow-lg backdrop-blur-lg"><span className="text-amber-400">To:&nbsp;</span><span className="text-xl text-pink-500 font-bold">{selectedConversation.fullname}</span></div>
                        <Messages />
                        <MessageInput />
                    </>
            }
        </div>
    )
}

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullname} ❄</p>
                <p>Select a chat to start messaging</p>
                <Icon icon="typcn:messages" className="text-3xl md:text-6xl text-center" />
            </div>
        </div>
    );
};

export default MessageContainer
