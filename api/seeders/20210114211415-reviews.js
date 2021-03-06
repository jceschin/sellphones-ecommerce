"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert("reviews", [
      {
        rating: 3,
        description: "It's quite expensive for the specifications",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        productId: 7,
      },
      {
        rating: 5,
        description: "This phone has the best camera for Instagram!",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
        productId: 7,
      },
      {
        rating: 4,
        description:
          "I dont like the chargers are so expensive, my cat have already broken two of them",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4,
        productId: 7,
      },
      {
        rating: 5,
        description:
          "Xiaomi costs 70% less of the new Iphone, and has better specs",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4,
        productId: 9,
      },
      {
        rating: 4,
        description: "I love the cyan color for my new phone",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 5,
        productId: 9,
      },
      {
        rating: 1,
        // Huawei
        description: "They deleted the playstore and i cant have any apps",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 5,
        productId: 1,
      },
      {
        rating: 5,
        // Huawei
        description:
          "Its very cheap and it has a really great camara for that price",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 6,
        productId: 1,
      },
      {
        rating: 4,
        // Huawei
        description: "Its a very balanced phone",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        productId: 1,
      },
      {
        rating: 5,
        // Huawei
        description: "I love the cyan color for my new phone",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4,
        productId: 1,
      },
      {
        rating: 1,
        // Huawei
        description: "I received the phone with a broken screen",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
        productId: 1,
      },
      {
        rating: 5,
        // Asus ROG Phone
        description: "It has an amazing storage",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        productId: 2,
      },
      {
        rating: 4,
        // Asus ROG Phone
        description: "I can play all the games i want",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 5,
        productId: 2,
      },
      {
        rating: 5,
        description:
          "I was expecting a gamer phone, but it has an amazing camara too",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4,
        productId: 2,
      },
      {
        rating: 5,
        description: "This phone is a beast",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        productId: 2,
      },
      {
        rating: 4,
        description:
          "My last phone was an Iphone and i switched to Samsung and im pleased",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        productId: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     
     */
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
