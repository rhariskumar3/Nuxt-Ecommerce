`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Customer = db.define(
    "customers", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "first_name",
        },
        lastName: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "last_name",
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        newsletter: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        freezeTableName: true,
        underscored: true,
    }
);

Customer.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
};

module.exports = Customer;