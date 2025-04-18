import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [conversations, setConversations] = useState([]);
    const [isloading, setLoading] = useState(false);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getConversations();
    }, [])

    return { conversations, isloading };
}

export default useGetConversations;