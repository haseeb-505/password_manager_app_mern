import express from "express";
import cors from "cors";
import cookierParser from "cookie-parser";
import { ApiError } from "./utils/ApiErrorHandler.js";

const app = express();

// cors middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// data handling
app.use(express.json({limit: "16Kb"}));

// url encoder
app.use(express.urlencoded({extended: true, limit: "16Kb"}));

// static folder
app.use(express.static("public"));

// cookierParser
app.use(cookierParser());

// error handling middleware for all routes
// app.use(ApiError);

// routes import
import userRouter from "./routes/user.routes.js";


// routes path
app.use("/api/v1/users", userRouter)

export {app};