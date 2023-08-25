import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const isValid = (req, res, next) => {
  const { recipId, userId } = req.params;
  if (!isValidObjectId(recipId || userId)) {
    next(HttpError(400, `${recipId || userId} is not valid ID`));
  }
  next();
};

export default isValid;
