import express from "express";
import authenticate from "../../middlewares/authenticate.js";
import controllers from "../../controllers/recipes.js";
import isValid from "../../middlewares/isValid.js";

const router = express.Router();

router.get("/category-list", authenticate, controllers.getCategories);
router.get("/main-page", authenticate, controllers.getCocktailsForMain);
router.get("/:id", authenticate, isValid, controllers.getCocktailsById);
router.get("/", authenticate, controllers.getCocktailByCategory);

export default router;
