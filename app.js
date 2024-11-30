import express, { Router } from "express";
import router from "./src/routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//checking entry point
app.get("/", (req, res) => {
    res.send("Hello World");
})
//using middleware routes
app.use("/api/v1",router);
export default app;