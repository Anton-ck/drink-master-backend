import express from "express";
import controllers from "../../controllers/ownRecipes.js";
import authenticate from "../../middlewares/authenticate.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import validateBody from "../../middlewares/validateBody.js";
import { cocktailSchema } from "../../schemas/cocktails.js";

const ownRouter = express.Router();

ownRouter.get("/", authenticate, controllers.getOwn);

ownRouter.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(cocktailSchema),
  controllers.addOwn
);

ownRouter.delete("/:id", authenticate, controllers.deleteOwn);

export default ownRouter;
