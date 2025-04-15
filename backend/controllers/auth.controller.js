import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            generateTokenSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
            }); // 201 Created status cod
        } else {
            res.status(400).json({ error: 'Invalid user data' }); // 400 Bad Request status code
        }
    } catch (error) {
        console.error('Error in signup controller:', error);
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isMatch = await bcrypt.compare(password, user.password || ''); // Use an empty string as the default value for user.password if it is undefined
        if (!user || !isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' }); // 400 Bad Request status code for invalid credentials
        }

        generateTokenSetCookie(user._id, res);
        res.status(200).json({ // 200 OK status code for successful login
            id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error('Error in login controller:', error); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal server error' }); // 500 Internal Server Error status code for unhandled exceptio
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 }); // Clear the JWT cookie by setting its expiration time to 0 milliseconds
        res.status(200).json({ message: 'Logged out successfully' }); // 200 OK status code for successful logout
    } catch (error) {

    }
}