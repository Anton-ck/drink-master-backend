import express from "express";
import controllers from "../../controllers/glasses.js";
import authenticate from "../../middlewares/authenticate.js";

const glassesRouter = express.Router();

glassesRouter.get("/", authenticate, controllers.getGlasses);

export default glassesRouter;
