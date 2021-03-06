"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert("categories", [
      {
        name: "Apple",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Samsung",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Huawei",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Xiaomi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Blackview",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Google",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Razer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ASUS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Motorola",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nokia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lenovo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "LG",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Oppo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "BlackBerry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "HTC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sony",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     */
    await queryInterface.bulkDelete("categories", null, {});
  },
};
