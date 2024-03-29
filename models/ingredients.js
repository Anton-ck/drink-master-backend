import { Schema, model } from "mongoose";


const ingredientSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		ingredientThumb: {
			type: String,
			required: true,
		},
		["thumb-medium"]: {
			type: String,
			required: true,
		},
		["thumb-small"]: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false }
);

const Ingredient = model("ingredient", ingredientSchema);

export default Ingredient;