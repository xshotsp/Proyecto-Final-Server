const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg",
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING,
        defaultValue: "form",
      },
    },
    {
      timestamps: false,
    }
  );
};
//-------------------Revisar--------------//
