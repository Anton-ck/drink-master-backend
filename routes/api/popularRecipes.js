import express from "express";
import controllers from "../../controllers/popularRecipes.js";
import authenticate from "../../middlewares/authenticate.js";

const popularRouter = express.Router();

popularRouter.get("/", authenticate, controllers.getPopular);

export default popularRouter;
