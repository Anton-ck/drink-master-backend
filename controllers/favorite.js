import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Cocktail from "../models/recipes.js";

//add cocktail in favorite

const addFavorite = async (req, res) => {
  const { _id } = req.user;
  const userId = _id.toString();
  const cocktailId = req.params.recipId;

  //check cocktail on favorite and in db
  try {
    const cocktail = await Cocktail.findById(cocktailId);

    if (cocktail.usersFavorite.includes(userId)) {
      return res.status(409).json({ message: "Favorite cocktail added early" });
    }
  } catch (error) {
    throw HttpError(404, `Cocktail with id=${cocktailId} not found`);
  }

  //if new cocktail for user,  then add to favorite
  await Cocktail.findByIdAndUpdate(
    cocktailId,
    { $push: { usersFavorite: userId } },
    {
      new: true,
    }
  );

  res.json({ message: "Cocktail added to favorite" });
};

//delete cocktail from favorite
const deleteFavorite = async (req, res) => {
  const { _id } = req.user;
  const userId = _id.toString();
  const cocktailId = req.params.recipId;

  //check cocktail on favorite and in db
  try {
    const cocktail = await Cocktail.findById(cocktailId);

    if (!cocktail.usersFavorite.includes(userId)) {
      return res
        .status(409)
        .json({ message: "Favorite cocktail deleted early" });
    }
  } catch (error) {
    throw HttpError(404, `Cocktail with id=${cocktailId} not found`);
  }

  await Cocktail.findByIdAndUpdate(
    cocktailId,
    { $pull: { usersFavorite: userId.toString() } },
    {
      new: true,
    }
  );
  res.json({ message: "Cocktail deleted  from favorite" });
};

//get all favorite cocktails by user
const getFavorites = async (req, res) => {
  const { _id } = req.user;
  const userId = _id.toString();

  const result = await Cocktail.find(
    { usersFavorite: userId },
    "-usersFavorite "
  );
  //return array of need fields
  // const array = result.map((cocktail) => {
  //   return {
  //     id: cocktail._id,
  //     drink: cocktail.drink,
  //     alcoholic: cocktail.alcoholic,
  //     glass: cocktail.glass,
  //     instructions: cocktail.instructions,
  //   };
  // });
  res.json([{ quantityOfFavorites: result.length }, ...result]);
};

export default {
  addFavorite: ctrlWrapper(addFavorite),
  deleteFavorite: ctrlWrapper(deleteFavorite),
  getFavorites: ctrlWrapper(getFavorites),
};
