"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert("product_categories", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "1",
        productId: "7",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "1",
        productId: "8",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "1",
        productId: "12",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "2",
        productId: "3",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "8",
        productId: "2",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "5",
        productId: "4",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "6",
        productId: "5",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "16",
        productId: "6",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "4",
        productId: "9",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "4",
        productId: "10",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "3",
        productId: "11",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     */
    await queryInterface.bulkDelete("product_categories", null, {});
  },
};
