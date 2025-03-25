import { Router } from "express";
import {
    addPassword,
    getAllPasswords,
    updatePassword,
    deletePassword
} from "../controllers/password.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

// Secure all routes with JWT verification
router.use(verifyJWT);

router.route("/")
    .post(addPassword)
    .get(getAllPasswords);

router.route("/:id")
    .delete(deletePassword)
    .patch(updatePassword);

export default router;