const router = require("express").Router();
const db = require("../../providers/sequelize.provider");
const Cat = db.cats;

router.post("/", async (req, res) => {
  const newCat = {
    name: req.body.name,
  };
  try {
    await Cat.create(newCat);
    return res.send("success");
  } catch (e) {
    return res.status(500).send("db err");
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Cat.findAll();
    return res.send(data);
  } catch (e) {
    console.error(e);
    return res.status(500).send("db err");
  }
});

module.exports = router;
