`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const OrderDetail = db.define(
    "orderDetails", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        orderId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "orders",
                },
                key: "id",
            },
            field: "order_id",
        },
        productId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "products",
                },
                key: "id",
            },
            field: "product_id",
        },
        productName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: {
                    tableName: "products",
                },
                key: "name",
            },
            field: "product_name",
        },
        productQuantity: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: "0",
            field: "product_quantity",
        },
        productPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            references: {
                model: {
                    tableName: "products",
                },
                key: "price",
            },
            field: "product_price",
        },
        productWeight: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "product_weight",
        },
        taxName: {
            type: DataTypes.STRING(16),
            allowNull: false,
            field: "tax_name",
        },
        taxRate: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "tax_rate",
        },
        shippingPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "shipping_price",
        },
        totalPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "total_price",
        },
    }, {
        freezeTableName: true,
        underscored: true,
        tableName: "order_details",
    }
);

module.exports = OrderDetail;