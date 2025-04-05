import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://anmolkhurana490:vWPxH7LNmv2bOR96@cluster0.08zk9.mongodb.net/Personalised-Health-Companion');
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;