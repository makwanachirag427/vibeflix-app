import express from "express";
const router = express.Router();
import { authCheck, login, logout, signup, trending } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
router.get("/authCheck",protectRoute,authCheck);
router.get("/trending",trending);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


export default router;
