const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "token not found" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded)
        next();
    } catch (err) {
        res.status(401).json({ error: "token is not valid" });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        console.log(...roles,"::;",req.user.role);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "This role can't access this route" });
        }
        next();
    };
};

module.exports = { protect, authorize };