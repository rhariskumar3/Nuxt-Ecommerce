`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Carousel = db.define(
    "carousel", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        subTitle: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: "sub_title",
        },
        action: {
            type: DataTypes.STRING(16),
            allowNull: true,
        },
        url: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Carousel;