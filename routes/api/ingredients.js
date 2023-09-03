import express from "express";
import authenticate from "../../middlewares/authenticate.js"
import controllers from "../../controllers/ingredients.js";

const router = express.Router();

router.get("/list", authenticate, controllers.getIngredientsList);

export default router;
