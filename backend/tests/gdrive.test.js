require("dotenv").config();
const { authorize } = require("../providers/gdrive.provider.js");
const { downloadFile, searchFile } = require("../providers/gdrive.provider");

const main = async () => {
  const client = await authorize();
  // const res = listFiles(client);
  const res = searchFile(client);
  console.log(res);
  // await downloadFile(client, "158UxCdF-jRupl87ipnRhFyy8RX0XIjFQ");
};
main();
