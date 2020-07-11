`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Carriers = db.define(
    "carriers", {
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
            field: "transit_time",
        },
        logo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        trackingUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "tracking_url",
        },
        maxWeight: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "max_weight",
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        zone: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
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
    }
);

module.exports = Carriers;