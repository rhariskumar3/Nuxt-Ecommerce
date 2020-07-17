`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Zone = require("../model/zones");

const Carriers = db.define("carriers", {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    transitTime: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    logo: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    trackingUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    maxWeight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    zoneId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: {
                tableName: "zones",
            },
            key: "id",
        },
    },
});

Carriers.belongsTo(Zone);

module.exports = Carriers;