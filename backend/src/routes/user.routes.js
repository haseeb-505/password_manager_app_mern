import { Router } from "express";
import {
    registerUser,
    loginUser,
} from "../controllers/user.controllers.js";


const router = Router();

// registration route, without avtar and cover image upload
router.route("/register").post(registerUser);
// login route
router.route("/login").post(loginUser);



export default router;