`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Categories = db.define("categories", {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: true,
        get() {
            return fileToUrl(this.getDataValue("image"));
        },
    },
    friendlyUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

Categories.afterCreate(async(category, options) => {
    return category.update({
        friendlyUrl: toSeoUrl(category.id + "-" + category.title),
    });
});

const toSeoUrl = (url) => {
    return url
        .toString() // Convert to string
        .normalize("NFD") // Change diacritics
        .replace(/[\u0300-\u036f]/g, "") // Remove illegal characters
        .replace(/\s+/g, "-") // Change whitespace to dashes
        .toLowerCase() // Change to lowercase
        .replace(/&/g, "-and-") // Replace ampersand
        .replace(/[^a-z0-9\-]/g, "") // Remove anything that is not a letter, number or dash
        .replace(/-+/g, "-") // Remove duplicate dashes
        .replace(/^-*/, "") // Remove starting dashes
        .replace(/-*$/, ""); // Remove trailing dashes
};

const fileToUrl = (url) =>
    url ?
    url.toString().includes("http") ?
    url :
    "http://" +
    process.env.API_HOST +
    ":" +
    process.env.API_PORT +
    "/" +
    url :
    url;

module.exports = Categories;