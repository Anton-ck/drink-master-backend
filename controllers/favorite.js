import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Cocktail from "../models/recipes.js";

//add cocktail in favorite

const addFavorite = async (req, res) => {
  const { _id } = req.user;
  const userId = _id.toString();
  const cocktailId = req.params.recipId;

  //check cocktail on favorite
  const cocktail = await Cocktail.findById(cocktailId);
  if (cocktail.usersFavorite.includes(userId)) {
    return res.status(409).json({ message: "Favorite cocktail added early" });
  }
  //if new cocktail for user,  then add to favorite
  await Cocktail.findByIdAndUpdate(
    cocktailId,
    { $push: { usersFavorite: userId } },
    {
      new: true,
    }
  );

  delete cocktail._doc.usersFavorite;
  res.json({ message: "Cocktail added to favorite", ...cocktail._doc });
};

//delete cocktail from favorite
const deleteFavorite = async (req, res) => {
  const { _id } = req.user;
  const userId = _id.toString();
  const cocktailId = req.params.recipId;

  //check cocktail on favorite

  const cocktail = await Cocktail.findById(cocktailId);

  if (!cocktail.usersFavorite.includes(userId)) {
    return res.status(409).json({ message: "Favorite cocktail deleted early" });
  }

  await Cocktail.findByIdAndUpdate(
    cocktailId,
    { $pull: { usersFavorite: userId.toString() } },

    {
      new: true,
    }
  );
  delete cocktail._doc.usersFavorite;
  res.json({ message: "Cocktail deleted from favorite", ...cocktail._doc });
};

//get all favorite cocktails by user
const getFavorites = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 8, ...query } = req.query;
  const parsedLimit = parseInt(limit);
  console.log("page", page);

  const userId = _id.toString();

  const result = await Cocktail.find(
    { usersFavorite: userId },
    "-usersFavorite "
  )
    .skip((page - 1) * parsedLimit) // Skip documents based on the page and limit
    .limit(parsedLimit); // Limit the number of documents per page

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
  if (result.length === 0) {
    return res.json({
      message: "No favorite cocktails have been added yet",
    });
  }
  res.json(result);
};

export default {
  addFavorite: ctrlWrapper(addFavorite),
  deleteFavorite: ctrlWrapper(deleteFavorite),
  getFavorites: ctrlWrapper(getFavorites),
};
