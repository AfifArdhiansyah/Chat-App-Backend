const jwt = require("jsonwebtoken");

const authMiddleware = {
    //verify token
    verifyToken : (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if(!token){
            res.status(401).json({
                status: "error",
                message: "Access denied",
                data: {}
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                res.status(403).json({
                    status: "error",
                    message: "Invalid token",
                    data: {}
                });
            }
            req.user = user;
            next();
        });
    },
};

module.exports = authMiddleware;