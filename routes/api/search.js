import express from "express";
import getSearchRecipes from "../../controllers/search"

const router = express.Router();

router.get("/", getSearchRecipes);

export default router;
