const Participant = require("./participants/participant.controller");
module.exports = (app) => {
  app.use("/api/participant", Participant);
};
