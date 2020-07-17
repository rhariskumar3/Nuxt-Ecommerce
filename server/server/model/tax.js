`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Tax = db.define("tax", {
    id: {
        type: DataTypes.INTEGER(16),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    rate: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        min: 0,
        defaultValue: 0,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

module.exports = Tax;