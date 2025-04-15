import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key from environment variables
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" }); // Return an error if the token is invalid
        }
        const user = await User.findById(decoded.userId).select("-password"); // Find the user in the database using the user ID from the token payload
        if (!user) {
            return res.status(401).json({ error: "Unauthorized - User Not Found" }); // Return an error if the user is not found in the database 
        }

        req.user = user; // Attach the user object to the request object for further use in the route handler
        next();
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: error.message });
    }
}

export default protectRoute; // Export the protectRoute function as the default export of this module