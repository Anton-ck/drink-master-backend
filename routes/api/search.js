import express from "express";
import controllers from "../../controllers/search.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();

router.get("/", authenticate, controllers.getSearchRecipes);

export default router;
