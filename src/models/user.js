const {Model, DataTypes} = require('sequelize');
const postgres = require('../databases/postgres');

class User extends Model {
}

User.init({
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    surname: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    activationCode: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }
}, {
    sequelize: postgres.db,
    modelName: 'User'
});

module.exports = User;
