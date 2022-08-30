const Cat = require("./cats/cat.controller");
module.exports = (app) => {
  app.use("/api/cats", Cat);
};
