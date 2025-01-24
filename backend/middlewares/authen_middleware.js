import { verifyToken } from "../authentication/stateless_auth.js";

// paths where logged in is not required, non-authentic paths
const nonAuthPaths = ['authenticate/signup', 'authenticate/login'];

const authMiddleware = (req, res, next) => {
    if (!nonAuthPaths.includes(req.path) && req.cookies.loginToken) {
        const token = req.cookies.loginToken;
        if (!token) res.send({ path: "/login", message: "Please login first" });

        const data = verifyToken(token);
        if (!data) {
            return res.send({ path: "/login", message: "Please login first" });
        }
        else req.data = data
    }
    next();
};

export default authMiddleware;