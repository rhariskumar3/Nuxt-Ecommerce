`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Countries = db.define(
    "countries", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        sortname: {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        phonecode: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    }
);

module.exports = Countries;