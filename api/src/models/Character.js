const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('character', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status:{
      type: DataTypes.ENUM('Alive', 'Deceased', 'Presumed dead', 'Unknown'),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdInDB:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  { timestamps: false });
};