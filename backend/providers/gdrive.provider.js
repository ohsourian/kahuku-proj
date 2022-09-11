const fs = require("fs").promises;
const mkdir = require("mkdirp");
const path = require("path");
const process = require("process");
const { google } = require("googleapis");

const SECRET = process.env.DRIVE_ACCESS_SECRET ?? "";
const SRC_PATH = process.env.CSV_SRC_PATH ?? "";
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const CREDENTIALS_PATH = path.join(process.cwd(), SECRET);
const DATA_WRITE_PATH = path.join(process.cwd(), SRC_PATH);

async function authorize() {
  return new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES,
  });
}

async function downloadFile(authClient, fileId, fileName) {
  // Get credentials and build service
  const service = google.drive({ version: "v3", auth: authClient });
  mkdir.sync(DATA_WRITE_PATH);
  try {
    const file = await service.files.get({
      fileId: fileId,
      alt: "media",
      mimeType: "text/csv",
    });
    await fs.writeFile(DATA_WRITE_PATH + `/${fileName}`, file.data);
    return file.status;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}

async function searchFile(authClient) {
  const service = google.drive({ version: "v3", auth: authClient });
  try {
    const res = await service.files.list({
      q: "name contains 'csv'",
      fields: "nextPageToken, files(id, name)",
      spaces: "drive",
    });
    return res.data.files.map((file) => {
      return {
        id: file.id,
        name: file.name,
      };
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  authorize,
  downloadFile,
  searchFile,
};
