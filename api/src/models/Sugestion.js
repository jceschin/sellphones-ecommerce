const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("sugestion", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
// aceptame
