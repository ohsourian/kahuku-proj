require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const router = express.Router();
const routers = require("./resources/index.controller");
const db = require("./providers/sequelize.provider");

const corsOpt = {
  origin: "*",
};
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOpt));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

db.sequelize.sync();
router.get("/", (req, res) => {
  return res.send("express");
});
router.get("/healthz", (req, res) => {
  return res.send("healthy!");
});
app.use("/", router);
routers(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  return res.status(err.status || 500).send(err.message);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
