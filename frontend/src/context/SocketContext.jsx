import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

const socketUrl = process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.PORT}` : process.env.SOCKET_URL;

export const useSocketContext = () => { // Create a custom hook to access the socket context [useSocketContext]
    return useContext(SocketContext); // Return the socket context [useContext(SocketContext)]
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null); // Initialize socket state to null [socket, setSocket]
    const [onlineUsers, setOnlineUsers] = useState([]); // Initialize onlineUsers state to an empty array [onlineUsers, setOnlineUsers]
    const { authUser } = useAuthContext();

    useEffect(() => { // Use useEffect to create and manage the socket connection [useEffect]
        if (authUser) {
            const socket = io(socketUrl, {
                query: {
                    userId: authUser._id, // Pass the userId as a query parameter [query:{userId: authUser._id}]
                }
            });
            setSocket(socket); // Set the socket state to the created socket [setSocket(socket)]

            socket.on("getOnlineUsers", (users) => { // Listen for the "connect" event [socket.on("connect")]
                setOnlineUsers(users); // Set the onlineUsers state to the received users [setOnlineUsers(users)]
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close(); // Close the socket connection when the component unmounts [socket.close()]
                setSocket(null); // Set the socket state to null [setSocket(null)]
            }
        }

    }, [authUser])
    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
}