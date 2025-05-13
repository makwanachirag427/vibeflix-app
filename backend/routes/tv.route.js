import express from "express";
const router = express.Router();
import {
  getTrendingShow,
  getShowTrailers,
  getShowDetails,
  getShowsByCategory,
  getSimilarShows,
} from "../controllers/tv.controller.js";

router.get("/trending", getTrendingShow);
router.get("/:id/trailers", getShowTrailers);
router.get("/:id/details", getShowDetails);
router.get("/:id/similar", getSimilarShows);
router.get("/:category", getShowsByCategory);

export default router;
