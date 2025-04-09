import { verifyToken } from "../authentication/stateless_auth.js";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.loginToken;

    if (!token) {
        return res.send({ path: "/login", message: "Please login first" });
    }

    const data = verifyToken(token);
    if (!data) {
        return res.send({ path: "/login", message: "Please login first" });
    }
    else {
        req.data = data;
        next();
    }
};

export default authMiddleware;