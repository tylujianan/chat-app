import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket.on("newMessage", (newMessage) => { // Listen for the "receiveMessage" event from the server. When the "receiveMessage" event is emitted by the server, the callback function is executed. The newMessage object contains information about the new message. 
            setMessages([...messages, newMessage])
        })

        return () => { // Cleanup function to remove the event listener when the component is unmounted. This prevents memory leaks.
            socket.off("newMessage"); // Remove the "receiveMessage" event listener from the socket. This ensures that the event listener is removed when the component is unmounted. This prevents memory leaks.
        }
    }, [socket, messages, setMessages])
}

export default useListenMessages;