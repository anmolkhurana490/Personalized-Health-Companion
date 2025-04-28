import mongoose from "mongoose";
import { config } from "dotenv";

config({ path: './.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/Personalised-Health-Companion`);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;