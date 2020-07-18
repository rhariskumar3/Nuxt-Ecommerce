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
            allowNull: true,
            field: "image_1",
            get() {
                return fileToUrl(this.getDataValue("image1"));
            },
        },
        image2: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "image_2",
            get() {
                return fileToUrl(this.getDataValue("image2"));
            },
        },
        image3: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "image_3",
            get() {
                return fileToUrl(this.getDataValue("image3"));
            },
        },
        image4: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "image_4",
            get() {
                return fileToUrl(this.getDataValue("image4"));
            },
        },
        image5: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "image_5",
            get() {
                return fileToUrl(this.getDataValue("image5"));
            },
        },
        video: {
            type: DataTypes.STRING(255),
            allowNull: true,
            get() {
                return fileToUrl(this.getDataValue("video"));
            },
        },
    }, {
        tableName: "product_media",
    }
);

const fileToUrl = (url) => url ? (url.toString().includes("http") ? url : "http://" + process.env.API_HOST + ":" + process.env.API_PORT + "/" + url) : url;

module.exports = Media;