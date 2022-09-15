const {
  authorize,
  searchFile,
  downloadFile,
} = require("../providers/gdrive.provider");

async function download() {
  console.log("run");
  try {
    const auth = await authorize();
    const fileList = await searchFile(auth);
    for (const file of fileList) {
      await downloadFile(auth, file.id, file.name);
    }
    console.log("download finished!");
  } catch (e) {
    throw new Error("gdrive access error");
  }
}

module.exports = {
  download,
};
