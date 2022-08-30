module.exports = (sequelize, Module) => {
  const Cat = sequelize.define("cat", {
    id: {
      type: Module.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Module.STRING,
    },
  });
  return Cat;
};
