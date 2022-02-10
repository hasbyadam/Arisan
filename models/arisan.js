"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Arisan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Arisan.belongsTo(models.User, { foreignKey: "userId" });
      Arisan.hasMany(models.Participant, { foreignKey: "arisanId" })
    }
  }
  Arisan.init(
    {
      title: DataTypes.STRING,
      dues: DataTypes.STRING,
      paymentPeriod: DataTypes.ENUM(["Mingguan", "Bulanan"]),
      lotteryDate: DataTypes.DATE,
      balance: DataTypes.INTEGER,
      totalParticipant: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Arisan",
    }
  );
  return Arisan;
};
