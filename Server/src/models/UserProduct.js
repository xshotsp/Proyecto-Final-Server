const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("User_Product", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    userEmail: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
  });
};

