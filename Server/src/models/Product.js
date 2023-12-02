const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('product', {
    id: {
<<<<<<< HEAD
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
      },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    colour: {
        type: DataTypes.STRING,
        allowNull: false
    },
    additionalImage: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false    
    }
  },{
    timestamps: false
});
}

=======
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
    // additionalImage: {
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     allowNull: false    
    // }
  },{
    timestamps: false
  });
};
>>>>>>> cambios_juan
