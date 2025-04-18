import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [isloading, setLoading] = useState();
    const { setAuthUser } = useAuthContext();
    const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullname, username, password, confirmPassword, gender });
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data)); // Store user inf
            toast.success('Submit successfully!!');
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { signup, isloading };
};

function handleInputErrors({ fullname, username, password, confirmPassword, gender }) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        console.log(fullname, username, password, confirmPassword, gender);
        toast.error("Please fill all the fields")
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters")
        return false;
    }

    return true;
}

export default useSignup; 