`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Order = require("./orders");
const Product = require("./products");

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
        },
        productQuantity: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: "0",
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
        },
        productWeight: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
        },
        taxName: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        taxRate: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
        },
        shippingPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
        },
        totalPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
        },
    }, {
        tableName: "order_details",
    }
);

OrderDetail.belongsTo(Order);
OrderDetail.belongsTo(Product);

module.exports = OrderDetail;