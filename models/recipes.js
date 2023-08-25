import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";
const cocktailSchema = new Schema(
  {
    drink: {
      type: String,
      required: [true, "Drink name is required"],
    },
    drinkAlternate: {
      type: String,
    },
    tags: {
      type: String,
    },
    video: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    IBA: {
      type: String,
    },
    alcoholic: {
      type: String,
      required: [true, "Alcoholic is required"],
    },
    glass: {
      type: String,
    },
    instructions: {
      type: String,
    },
    instructionsES: {
      type: String,
    },
    instructionsDE: {
      type: String,
    },
    instructionsFR: {
      type: String,
    },
    instructionsIT: {
      type: String,
    },
    instructionsRU: {
      type: String,
    },
    instructionsPL: {
      type: String,
    },
    instructionsUK: {
      type: String,
    },
    drinkThumb: {
      type: String,
    },
    ingredients: {
      type: Array,
      required: [true, "Ingredients is required"],
    },
    usersFavorite: {
      type: Array,
    },
  },
  { versionKey: false }
);

cocktailSchema.post("save", handleMongooseError);

const Cocktail = model("cocktail", cocktailSchema);

export default Cocktail;
