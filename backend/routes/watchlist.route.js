import express from "express";
import { addToWatchList, getWatchList, removeFromWatchList } from "../controllers/watchlist.controller.js";
const router = express.Router();
router.get("/",getWatchList);
router.post("/add/:id", addToWatchList);
router.delete("/remove/:id", removeFromWatchList);

export default router;
