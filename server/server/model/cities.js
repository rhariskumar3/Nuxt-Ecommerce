`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const State = require("../model/states");

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
        },
    }, {
        timestamps: false,
    }
);

Cities.belongsTo(State);

module.exports = Cities;