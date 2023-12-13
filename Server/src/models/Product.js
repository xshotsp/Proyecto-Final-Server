const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    colour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    additionalImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: () => Math.floor(Math.random() * 30) + 1, // Valor predeterminado aleatorio entre 1 y 30
      validate: {
        isInt: {
          args: [1, 30],
          msg: 'Quantity must be a number in the range of 1 to 30',
        },
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    timestamps: false
  });
};