const jwt = require('jsonwebtoken');

exports.authMiddleware = (roles = []) => {
    return (req, res, next) => {
        console.log("Auth middleware invoked"); // Log when middleware is called
        const token = req.header("Authorization");

        if (!token) {
            console.log("No token provided."); // Log if no token
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        try {
            const extractedToken = token.startsWith("Bearer ") ? token.slice(7) : token;
            const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
            req.user = decoded; 

            console.log("Authenticated user:", req.user); // Log user info

            if (roles.length > 0 && !roles.includes(req.user.role)) {
                console.log("Access denied: Insufficient permissions."); // Log permission issues
                return res.status(403).json({ message: "Access Denied, insufficient permissions" });
            }

            next();
        } catch (error) {
            console.log("Token verification failed:", error.message); // Log errors
            return res.status(401).json({ message: "Token is not valid", error: error.message });
        }
    };
};
