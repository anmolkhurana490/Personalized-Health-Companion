import { verifyToken } from "../authentication/stateless_auth.js";
import { User } from "../models/registerSchema.js";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.loginToken;

    if (!token) {
        return res.send({ path: "/login", message: "Please login first" });
    }

    const data = verifyToken(token);
    if (!data) {
        return res.send({ path: "/login", message: "Please login first" });
    }
    else {
        const user = await User.findById(data._id);
        req.data = await { role: data.role, ...user._doc };
        next();
    }
};

export default authMiddleware;