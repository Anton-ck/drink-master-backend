import express from "express";
import controllers from "../../controllers/favorite.js";
import authenticate from "../../middlewares/authenticate.js";

const favoriteRouter = express.Router();
favoriteRouter.use(authenticate);

favoriteRouter.get("/", controllers.getFavorites);

favoriteRouter.delete(
  "/:recipId",
  //   validation.isValidId,
  //   validation.isEmptyBody,
  //   validation.validateBody(contactSchema.contactUpdateFavoriteSchema),
  controllers.deleteFavorite
);

favoriteRouter.patch(
  "/:recipId",
  //   validation.isValidId,
  //   validation.isEmptyBody,
  //   validation.validateBody(contactSchema.contactUpdateFavoriteSchema),
  controllers.addFavorite
);

export default favoriteRouter;
