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
  const totalHits = await Cocktail.countDocuments({ usersFavorite: userId });

  delete cocktail._doc.usersFavorite;
  res.json({
    totalHits,
    ...cocktail._doc,
  });
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
  const totalHits = await Cocktail.countDocuments({ usersFavorite: userId });
  delete cocktail._doc.usersFavorite;
  res.json({ totalHits, ...cocktail._doc });
};

//get all favorite cocktails by user
const getFavorites = async (req, res) => {
  const { _id } = req.user;
  const { page, limit } = req.query;
  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const skip = (parsedPage - 1) * parsedLimit;

  const userId = _id.toString();

  const totalHits = await Cocktail.countDocuments({ usersFavorite: userId });

  const drinks = await Cocktail.find(
    { usersFavorite: userId },
    "-usersFavorite "
  )
    .skip(skip) // Skip documents based on the page and limit
    .limit(parsedLimit); // Limit the number of documents per page

  if (drinks.length === 0) {
    return res.json({
      message: "No favorite cocktails have been added yet",
    });
  }
  res.json({ totalHits, drinks });
};

export default {
  addFavorite: ctrlWrapper(addFavorite),
  deleteFavorite: ctrlWrapper(deleteFavorite),
  getFavorites: ctrlWrapper(getFavorites),
};
