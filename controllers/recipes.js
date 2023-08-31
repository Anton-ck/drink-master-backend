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

const getCocktailParam = async (req, res) => {
  const { param } = req.params;
  const isId = /^[0-9a-fA-F]{24}$/.test(param);
  if (isId) {
    const result = await Cocktail.findById(param);
    if (!result) {
      throw HttpError(404, `Cocktail with id=${id} not found`);
    }
    res.json(result);
  } else {
    const { page = 1, limit = 8, ...query } = req.query;
    const skip = (page - 1) * limit;
    const result = await Cocktail.find({ category: param })
      .skip(skip)
      .limit(limit);
    if (!result || result.length === 0) {
      throw HttpError(404, `Cocktail in category "${param}" not found`);
    }
    res.json(result);
  }
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
  res.json(result);
};

export default {
  getCategories: ctrlWrapper(getCategories),
  getCocktailParam: ctrlWrapper(getCocktailParam),
  getCocktailsForMain: ctrlWrapper(getCocktailsForMain),
};
