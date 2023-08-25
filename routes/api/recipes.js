import express from "express";
import authenticate from "../../middlewares/authenticate.js";
import controllers from "../../controllers/recipes.js";

const router = express.Router();

router.get("/category-list", authenticate, controllers.getCategories);
router.get("/main-page", authenticate, controllers.getCocktailsForMain);
router.get("/:param", authenticate, controllers.getCocktailParam);

export default router;
