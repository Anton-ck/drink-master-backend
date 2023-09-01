import { Schema, model } from "mongoose";
import categories from "../DB/categories.json" assert { type: "json" };
import glassess from "../DB/glassess.json" assert { type: "json" };

import handleMongooseError from "../helpers/handleMongooseError.js";

const cocktailSchema = new Schema(
  {
    drink: {
      type: String,
      minlength: 2,
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
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: categories,
      required: [true, "Category is required"],
    },
    IBA: {
      type: String,
    },
    alcoholic: {
      type: String,
      // required: [true, "Type of drink is required"],
    },
    glass: {
      type: String,
      enum: glassess,
      required: [true, "Type of glass is required"],
    },
    instructions: {
      type: String,
      minlength: 30,
      required: [true, "Instructions is required"],
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
      required: true,
    },
    ingredients: {
      type: Array,
      required: [true, "Ingredients is required"],
    },
    usersFavorite: {
      type: Array,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

cocktailSchema.post("save", handleMongooseError);

const Cocktail = model("cocktail", cocktailSchema);

export default Cocktail;
