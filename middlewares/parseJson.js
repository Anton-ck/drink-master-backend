const jsonParse = async (req, res, next) => {
  let { ingredients } = req.body;

  try {
    if (typeof ingredients === "string") {
      req.body.ingredients = await JSON.parse(ingredients);
    }
  } catch (error) {}

  next();
};

export default jsonParse;
