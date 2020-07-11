`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Product = db.define(
    "products", {
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
            allowNull: false,
        },
        category: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "categories",
                },
                key: "id",
            },
        },
        media: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "product_media",
                },
                key: "id",
            },
        },
        quantity: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: "0",
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
        },
        tax: {
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
            defaultValue: "1",
            field: "minimum_quantity",
        },
        width: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
        },
        height: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
        },
        depth: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
        },
        weight: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
        },
        shippingFee: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "shipping_fee",
        },
        metaTitle: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "meta_title",
        },
        metaDescription: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: "meta_description",
        },
        friendlyUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "friendly_url",
        },
        viewedTimes: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: "0",
            field: "viewed_times",
        },
        purchasedTimes: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: "0",
            field: "purchased_times",
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

module.exports = Product;