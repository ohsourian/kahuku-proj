const Participant = require("./participants/participant.controller");
const GDrive = require("./gdrive/gdrive.controller");
module.exports = (app) => {
  app.use("/api/participant", Participant);
  app.use("/api/drive", GDrive);
};
