import Joi from "joi";
import categories from "../DB/categories.json" assert { type: "json" };
import glassess from "../DB/glassess.json" assert { type: "json" };

export const cocktailSchema = Joi.object({
  drink: Joi.string().min(2).required(),
  drinkAlternate: Joi.string(),
  tags: Joi.string(),
  video: Joi.string(),
  description: Joi.string(),
  category: Joi.string()
    .valid(...categories)
    .required(),
  IBA: Joi.string(),
  alcoholic: Joi.string(),
  glass: Joi.string()
    .valid(...glassess)
    .required(),
  instructions: Joi.string().min(30).required(),
  instructionsES: Joi.string(),
  instructionsDE: Joi.string(),
  instructionsFR: Joi.string(),
  instructionsIT: Joi.string(),
  instructionsRU: Joi.string(),
  instructionsPL: Joi.string(),
  instructionsUK: Joi.string(),
  drinkThumb: Joi.string(),
  // ingredients: Joi.array().items(Joi.string().required()).min(2).required(),
  ingredients: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        ingredientThumb: Joi.string().required(),
        ["thumb-medium"]: Joi.string().required(),
        ["thumb-small"]: Joi.string().required(),
      }).required()
    )
    .min(2)
    .required(),
  usersFavorite: Joi.array().items(Joi.string()),
});
