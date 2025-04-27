import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authMiddleware from "./middlewares/authen_middleware.js";
import cron from "node-cron";

import authenticate_router from "./routes/authenticate.js";
import chatbot_router from "./routes/chatbot.js";
import dashboard_router from "./routes/dashboard.js";

import { updateHealthData } from "./api/updateRealTimeData.js";

import http from "http";
import { VideoSocketServer, ChatSocketServer } from "./routes/websockets.js";
import { generateAIContent } from "./api/ai_content.js";

const app = express();
const server = http.createServer(app);
let port = 3000;

connectDB();

app.use(cors({
    origin: ['http://localhost:5173', 'https://personalized-health-companion.vercel.app'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Apply authentication middleware
// app.use(authMiddleware);

app.use('/authenticate', authenticate_router);
app.use('/gemini-chatbot', chatbot_router);
app.use('/dashboard', authMiddleware, dashboard_router);

cron.schedule('0 8,18 * * *', updateHealthData); // Run at 8:00 AM and 6:00 PM
cron.schedule('0 8 * * *', generateAIContent); // Run at 8:00 AM

VideoSocketServer(server);
ChatSocketServer(server);

server.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});