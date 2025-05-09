import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const useLogin = () => {
    const [isloading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const login = async ({ username, password }) => {
        const success = handleInputErrors({ username, password });
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data)); // Store user info in local storage
            setAuthUser(data); // Update the auth user context

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { login, isloading };
}

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill all the fields")
        return false;
    }

    return true;
}

export default useLogin;