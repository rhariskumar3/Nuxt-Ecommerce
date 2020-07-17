`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Categories = require("../model/categories");
const ProductMedia = require("../model/productMedia");
const Tax = require("../model/tax");

const Product = db.define("products", {
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
    summary: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    },
    categoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: {
                tableName: "categories",
            },
            key: "id",
        },
    },
    mediaId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: {
                tableName: "productMedia",
            },
            key: "id",
        },
    },
    quantity: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
        isInt: true,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        min: 10,
    },
    taxId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: {
                tableName: "tax",
            },
            key: "id",
        },
    },
    minimumQuantity: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 1,
        isInt: true,
        min: 1,
    },
    length: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    breadth: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    height: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    dia: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: "0",
    },
    shippingFee: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },
    metaTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    metaDescription: {
        type: DataTypes.STRING(200),
    },
    friendlyUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    viewedTimes: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
        unique: true,
        isInt: true,
    },
    purchasedTimes: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
        isInt: true,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

Product.afterCreate(async(product, options) => {
    return product.update({
        friendlyUrl: toSeoUrl(product.id + "-" + product.name),
    });
});

Product.belongsTo(Categories);
Product.belongsTo(ProductMedia, { as: "media" });
Product.belongsTo(Tax);

function toSeoUrl(url) {
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
}

module.exports = Product;