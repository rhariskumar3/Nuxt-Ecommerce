`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Carousel = db.define("carousel", {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: false,
        get() {
            return fileToUrl(this.getDataValue("image"));
        },
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    subTitle: {
        type: DataTypes.STRING(50),
        allowNull: true,
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
});

const fileToUrl = (url) => url ? (url.toString().includes("http") ? url : "http://" + process.env.API_HOST + ":" + process.env.API_PORT + "/" + url) : url;

module.exports = Carousel;