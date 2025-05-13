import express from "express";
import { getSearchHistory, removeItemFromSearchHistory, searchMovie, searchPerson, searchShow } from "../controllers/search.controller.js";
const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/tv/:query", searchShow);
router.get("/movie/:query", searchMovie);


router.get("/history",getSearchHistory);
router.delete("/history/:id",removeItemFromSearchHistory);

export default router;
