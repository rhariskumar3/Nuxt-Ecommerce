`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Employee = db.define(
    "employee", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "first_name",
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "last_name",
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        freezeTableName: true,
        underscored: true,
    }
);

Employee.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
};

module.exports = Employee;