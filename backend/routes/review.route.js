import express from "express";
import { addOrUpdateReview, removeReview } from "../controllers/review.controller.js";
const router = express.Router();

router.post("/add/:id", addOrUpdateReview);
router.delete("/remove/:id",removeReview)

export default router;
