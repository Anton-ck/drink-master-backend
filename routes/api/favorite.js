import express from "express";
import controllers from "../../controllers/favorite.js";
import authenticate from "../../middlewares/authenticate.js";
import isValid from "../../middlewares/isValid.js";

const favoriteRouter = express.Router();
favoriteRouter.use(authenticate);

favoriteRouter.get("/", controllers.getFavorites);

favoriteRouter.delete("/:recipId", isValid, controllers.deleteFavorite);

favoriteRouter.patch("/:recipId", isValid, controllers.addFavorite);

export default favoriteRouter;
