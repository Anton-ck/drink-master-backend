import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Cocktail from "../models/recipes.js";
import fs from "fs/promises";
import path from "path";

const categoriesPath = path.resolve("DB", "categories.json");

const getCategories = async (req, res) => {
  const data = await fs.readFile(categoriesPath);
  const result = JSON.parse(data);
  if (result.length === 0) {
    throw HttpError(404, "Categories not found");
  }
  result.sort((a, b) => a.localeCompare(b));
  res.json(result);
};

const getCocktailsById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await Cocktail.findById(id);

  if (!result) {
    throw HttpError(404, "Sorry, no drinks were found");
  }
  res.json(result);
};

const getCocktailByCategory = async (req, res) => {
  const { category, page = 1, limit = 8 } = req.query;

  const query = {};
  category && (query.category = category);
  const skip = (page - 1) * limit;

  const result = await Cocktail.find({ category }).skip(skip).limit(limit);

  if (!result || result.length === 0) {
    throw HttpError(404, `Cocktail in category "${category}" not found`);
  }
  res.json(result);
};

const getCocktailsForMain = async (req, res) => {
  const categories = ["Ordinary Drink", "Cocktail", "Shake", "Other/Unknown"];

  const result = [];

  for (const category of categories) {
    const cocktailsInCategory = await Cocktail.find({
      category,
    }).limit(3);
    result.push(...cocktailsInCategory);
  }
  if (!result) {
    throw HttpError(404, "Sorry, no drinks were found");
  }
  res.json(result);
};

export default {
  getCategories: ctrlWrapper(getCategories),
  getCocktailByCategory: ctrlWrapper(getCocktailByCategory),
  getCocktailsById: ctrlWrapper(getCocktailsById),
  getCocktailsForMain: ctrlWrapper(getCocktailsForMain),
};
