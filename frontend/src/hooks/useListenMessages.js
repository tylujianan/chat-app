import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";
import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => { // Listen for the "receiveMessage" event from the server. When the "receiveMessage" event is emitted by the server, the callback function is executed. The newMessage object contains information about the new message. 
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound); // Create a new Audio object with the notification sound file. This object is used to play the notification sound when a new message is received.
            sound.play(); // Play the notification sound. This method starts playing the sound. The sound will play until it is stopped or finished.
            setMessages([...messages, newMessage])
        })

        return () => { // Cleanup function to remove the event listener when the component is unmounted. This prevents memory leaks.
            socket?.off("newMessage"); // Remove the "receiveMessage" event listener from the socket. This ensures that the event listener is removed when the component is unmounted. This prevents memory leaks.
        }
    }, [socket, messages, setMessages])
}

export default useListenMessages;