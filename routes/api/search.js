import express from "express";
import controllers from "../../controllers/search.js";

const router = express.Router();

router.get("/", controllers.getSearchRecipes);

export default router;
