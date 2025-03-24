import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";


const router = Router();

// registration route, without avtar and cover image upload
router.route("/register").post(registerUser);
// login route
router.route("/login").post(loginUser);
// auth check route
router.route("/check-auth").get(verifyJWT, (req, res) =>{
    res.status(200).json({ message: "Authenticated", user: req.user });
})
// logout route
router.route("/logout").post(verifyJWT, logoutUser)



export default router;