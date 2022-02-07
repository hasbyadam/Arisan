"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Arisans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      dues: {
        type: Sequelize.STRING,
      },
      paymentPeriod: {
        type: Sequelize.ENUM(["Mingguan", "Bulanan"]),
      },
      lotteryDate: {
        type: Sequelize.STRING,
      },
      customDate: {
        type: Sequelize.DATE,
      },
      balance: {
        type: Sequelize.INTEGER,
      },
      totalParticipant: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Arisans");
  },
};
