import express from "express";
import controllers from "../../controllers/glasses.js";
const glassesRouter = express.Router();

glassesRouter.get("/", controllers.getGlasses);

export default glassesRouter;
