const Participant = require("./participants/participant.controller");
module.exports = (app) => {
  app.use("/api/participants", Participant);
};
