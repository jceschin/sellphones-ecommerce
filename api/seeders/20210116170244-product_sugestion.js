"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert("product_sugestion", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 1,
        productId: 1,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 1,
        productId: 4,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 1,
        productId: 5,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 1,
        productId: 9,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 1,
        productId: 10,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 1,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 3,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 4,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 5,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 6,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 7,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 8,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 9,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 10,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 2,
        productId: 11,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 3,
        productId: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 3,
        productId: 3,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 3,
        productId: 4,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 3,
        productId: 9,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 3,
        productId: 11,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 3,
        productId: 10,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 4,
        productId: 1,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 4,
        productId: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 4,
        productId: 3,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 4,
        productId: 9,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 4,
        productId: 5,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 4,
        productId: 6,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 4,
        productId: 7,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 4,
        productId: 8,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 4,
        productId: 10,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 4,
        productId: 11,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 5,
        productId: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 5,
        productId: 3,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 5,
        productId: 7,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 5,
        productId: 8,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 5,
        productId: 11,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 6,
        productId: 1,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 6,
        productId: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 6,
        productId: 3,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 6,
        productId: 4,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 6,
        productId: 6,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 6,
        productId: 7,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 6,
        productId: 8,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 6,
        productId: 9,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 6,
        productId: 10,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        sugestionId: 6,
        productId: 11,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     */
    await queryInterface.bulkDelete("product_sugestion", null, {});
  },
};
