import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authenticate_router from "./routes/authenticate.js";
import { verifyToken } from "./authentication/stateless_auth.js";
import connectDB from "./config/db.js";
import authMiddleware from "./middlewares/authen_middleware.js";

const app = express();
let port = 3000;

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Apply authentication middleware
app.use(authMiddleware);

app.use('/authenticate', authenticate_router);

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
})