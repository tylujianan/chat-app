import { createContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null); // Initialize socket state to null [socket, setSocket]
    const [onlineUsers, setOnlineUsers] = useState([]); // Initialize onlineUsers state to an empty array [onlineUsers, setOnlineUsers]
    const { authUser } = useAuthContext();

    useEffect(() => { // Use useEffect to create and manage the socket connection [useEffect]
        if (authUser) {
            const socket = io("http://localhost:3000");
            setSocket(socket); // Set the socket state to the created socket [setSocket(socket)]
            return () => socket.close();
        } else {
            if (socket) {
                socket.close(); // Close the socket connection when the component unmounts [socket.close()]
                setSocket(null); // Set the socket state to null [setSocket(null)]
            }
        }

    })
    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
}