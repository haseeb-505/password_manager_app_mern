import express from "express";
import cors from "cors";
import cookierParser from "cookie-parser";

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

export {app};