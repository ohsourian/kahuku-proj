const {
  authorize,
  searchFile,
  downloadFile,
} = require("../../providers/gdrive.provider");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const auth = await authorize();
    const fileList = await searchFile(auth);
    for (const file of fileList) {
      await downloadFile(auth, file.id, file.name);
    }
    return res.send({ found: fileList });
  } catch (e) {
    return res.status(500).send("gdrive access error");
  }
});

module.exports = router;
