const jwt = require("jsonwebtoken");
const Constants = require("../utils/constants");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({
            status: 401,
            data: null,
            message: "Unauthorized Access",
            error: "Token missing",
        });
    }

    // Verify token
    jwt.verify(token, Constants.SECRETS.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                data: null,
                message: "Forbidden Access",
                error: "Invalid token",
            });
        }
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;