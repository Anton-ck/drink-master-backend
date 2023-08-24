
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Recipe  from "../models/recipes.js"; 
import Ingredient from "../models/ingredients.js";

const getSearchRecipes = async (req, res) => {
    const { type, query } = req.query;

    let recipes = [];

    if (type === "Ingredients") {
        const ingredient = await Ingredient.findOne({
            title: { $regex: query, $options: "i" },
        });
        if (!ingredient) {
            throw HttpError(404, `Ingridient not found`);
        }
        recipes = await Recipe.find({
            ingredients: { $elemMatch: { id: ingredient._id } },
        });
    }

    if (type === "Title") {
        recipes = await Recipe.find({
            title: { $regex: query, $options: "i" },
        });
    }

    if (recipes.length === 0) {
        throw HttpError(404, `Recipes not found`);
    }

    return res.status(200).json({
        totalHits: recipes.length,
        result: recipes,
    });
};

export default {
    getSearchRecipes: ctrlWrapper(getSearchRecipes),
}; 