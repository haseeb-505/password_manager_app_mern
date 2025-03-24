import express, { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/check-auth", verifyJWT, (req, res) => {
    res.status(200).json({message: "Authenticated", user: req.user})
});

export default router;