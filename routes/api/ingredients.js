import express from "express";
import  getIngredientsList  from "../../controllers/ingredients.js";

const router = express.Router();


router.get("/list", getIngredientsList);

// router.get('/', authenticate, getReceiptByIngredient)

export default router;
