import express from "express";
import controllers from "../../controllers/favorite.js";
import authenticate from "../../middlewares/authenticate.js";

const favoriteRouter = express.Router();
favoriteRouter.use(authenticate);
// router.get("/");
favoriteRouter.patch(
  "/:recipId",
  //   validation.isValidId,
  //   validation.isEmptyBody,
  //   validation.validateBody(contactSchema.contactUpdateFavoriteSchema),
  controllers.updateFavorite
);

export default favoriteRouter;
