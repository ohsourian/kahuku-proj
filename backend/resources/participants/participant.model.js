module.exports = (sequelize, Module) => {
    const Participant = sequelize.define("participant", {
      id: {
        type: Module.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Module.STRING,
      },
      gender: {
        type: Module.TINYINT(1),
      },
      group: {
        type: Module.INTEGER,
      },
      belong: {
        type: Module.STRING,
      },
      groupLeader: {
        type: Module.TINYINT(1),
      },
      profileColor: {
        type: Module.STRING,
      },

    });
    return Participant;
  };