import express from "express";

import controllers from "../../controllers/ingredients.js";

const router = express.Router();

router.get("/list", controllers.getIngredientsList);

// router.get('/', authenticate, getReceiptByIngredient)

export default router;
