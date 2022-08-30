const dbConfig = require("../config/database.config");
const { Sequelize } = require("sequelize");
const Models = require("../resources/index.model");
const { Cat } = Models;
const seq = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: Number(dbConfig.port),
  dialect: dbConfig.dialect,
});

module.exports = {
  sequelize: seq,
  cats: Cat(seq, Sequelize),
};
