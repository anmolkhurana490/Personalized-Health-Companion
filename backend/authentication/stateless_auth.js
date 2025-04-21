import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({ path: './.env' });

export const signToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '72h' })
}

export const verifyToken = (data) => {
    try {
        return jwt.verify(data, process.env.JWT_SECRET_KEY);
    }
    catch (e) {
        return null;
    }
}