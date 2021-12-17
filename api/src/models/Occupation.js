const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('occupation', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: false }); //CON ESTO ELIMINO los campos createdAt y updatedAt QUE VIENEN POR DEFAULT.);
};