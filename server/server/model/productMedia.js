`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Media = db.define(
    "productMedia", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        image1: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "image_1",
        },
        image2: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "image_2",
        },
        image3: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "image_3",
        },
        image4: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "image_4",
        },
        image5: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "image_5",
        },
        video: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        tableName: "product_media",
    }
);

module.exports = Media;