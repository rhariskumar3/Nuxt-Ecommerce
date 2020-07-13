`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Country = require("../model/countries");
const Zone = require("../model/zones");

const State = db.define(
    "states", {
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
        countryId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: "1",
            references: {
                model: {
                    tableName: "countries",
                },
                key: "id",
            },
        },
        zoneId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: "0",
            references: {
                model: {
                    tableName: "zones",
                },
                key: "id",
            },
        },
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    }
);

State.belongsTo(Country);
State.belongsTo(Zone);

module.exports = State;