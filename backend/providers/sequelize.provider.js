const dbConfig = require("../config/database.config");
const { Sequelize } = require("sequelize");
const Models = require("../resources/index.model");
const { Participant } = Models;
const seq = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: Number(dbConfig.port),
  dialect: dbConfig.dialect,
});

module.exports = {
  sequelize: seq,
  participants: Participant(seq, Sequelize),
};
