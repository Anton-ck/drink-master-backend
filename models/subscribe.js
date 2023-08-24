import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

const subscribeSchema = new Schema({}, { versionKey: false, timestamps: true });

subscribeSchema.post("save", handleMongooseError);

const Subscribe = model("subscribe", subscribeSchema);

export default Subscribe;
