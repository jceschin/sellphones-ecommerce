const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    city: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    adress: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    postal: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    subTotal: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        isDecimal: true,
      },
    },
    iva: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        isDecimal: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
