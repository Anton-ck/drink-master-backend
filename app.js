import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json" assert { type: "json" };

import authRouter from "./routes/api/auth.js";
import subscribeRouter from "./routes/api/subscribe.js";
import recipesRouter from "./routes/api/recipes.js";
import searchRouter from "./routes/api/search.js";
import ingredientsRouter from "./routes/api/ingredients.js";
import glassesRouter from "./routes/api/glasses.js";
import ownRouter from "./routes/api/ownRecipes.js";
import favoriteRouter from "./routes/api/favorite.js";
import popularRecipes from "./routes/api/popularRecipes.js";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/subscribe", subscribeRouter);
app.use("/recipes", recipesRouter);
app.use("/search", searchRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/glasses", glassesRouter);
app.use("/own", ownRouter);
app.use("/favorite", favoriteRouter);
app.use("/popular-recipe", popularRecipes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

app.use((err, req, res, next) => {
  res.setHeader("Accept-Encoding", "gzip, br");
  next();
});
export default app;
