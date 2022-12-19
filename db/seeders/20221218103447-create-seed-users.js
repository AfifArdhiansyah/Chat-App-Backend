'use strict';
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123", 10);
    await queryInterface.bulkInsert('users', [
    {
      id: uuid(),
      username: 'hermann',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      username: "johndoe",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      username: "waluyo",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
