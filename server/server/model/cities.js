`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Cities = db.define(
    "cities", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        stateId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: "state_id",
        },
    }, {
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Cities;