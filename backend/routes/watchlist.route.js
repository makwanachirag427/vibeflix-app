import express from "express";
import { addToWatchList, removeFromWatchList } from "../controllers/watchlist.controller.js";
const router = express.Router();

router.post("/add/:id", addToWatchList);
router.delete("/remove/:id", removeFromWatchList);

export default router;
