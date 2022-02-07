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
        type: Sequelize.INTEGER,
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
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
