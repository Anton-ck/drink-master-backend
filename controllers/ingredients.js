// import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

import Ingredient from "../models/ingredients.js";

const getIngredientsList = async (req, res) => {
  const ingredients = await Ingredient.find();
  res.json(ingredients);
};

export default {
  getIngredientsList: ctrlWrapper(getIngredientsList),
};
