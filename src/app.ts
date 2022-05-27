import express, { Application } from "express";
import cors from "cors";
import login from "./routes/login";
import logout from "./routes/logout";
import register from "./routes/register";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./utils/validator/isAuthenticated";
const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["POST"]
}))
app.use('/api/register', isAuthenticated, register);
app.use('/api/login', isAuthenticated, login);
app.use('/api/logout', logout);

export { app }