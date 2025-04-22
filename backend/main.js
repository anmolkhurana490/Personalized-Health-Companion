import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authMiddleware from "./middlewares/authen_middleware.js";

import authenticate_router from "./routes/authenticate.js";
import chatbot_router from "./routes/chatbot.js";
import dashboard_router from "./routes/dashboard.js";

import http from "http";
import VideoSocketServer from "./routes/video_socket.js";

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

VideoSocketServer(server);

server.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});