import express from "express";
import { registerUser,loginUser,getUser } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post('/signup',registerUser);
router.post('/login',loginUser);
router.get('/me',verifyToken, getUser)

export default router;