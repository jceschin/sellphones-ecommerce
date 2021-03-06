"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert("sugestions", [
      {
        name: "cheap",
        desc: "You want to spend more than $400",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "gamer",
        desc: "You usually play games in the phone",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "battery",
        desc: "You need a long battery",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "camera",
        desc: "U rlly love taking photos",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "instagram",
        desc: "Love upload content to instagram?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "storage",
        desc: "Want to save a lot of content in your mobile",
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
    await queryInterface.bulkDelete("sugestions", null, {});
  },
};
