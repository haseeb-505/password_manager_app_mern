import express from "express";
import cors from "cors";
import cookierParser from "cookie-parser";
// import { ApiError } from "./utils/ApiErrorHandler.js";

const app = express();

// cors middleware
app.use(cors({
    origin:  "http://localhost:5173",
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



// routes import
import userRouter from "./routes/user.routes.js";



// routes path
app.use("/api/v1/users", userRouter)

export {app};