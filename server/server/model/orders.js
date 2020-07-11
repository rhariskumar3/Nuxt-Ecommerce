`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Order = db.define(
    "orders", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        reference: {
            type: DataTypes.STRING(9),
            allowNull: true,
        },
        customerId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "customers",
                },
                key: "id",
            },
            field: "customer_id",
        },
        carrier: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "carriers",
                },
                key: "id",
            },
        },
        addressDelivery: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "address",
                },
                key: "id",
            },
            field: "address_delivery",
        },
        addressInvoice: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "address",
                },
                key: "id",
            },
            field: "address_invoice",
        },
        currentState: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "order_states",
                },
                key: "id",
            },
            field: "current_state",
        },
        payment: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        shippingNumber: {
            type: DataTypes.STRING(64),
            allowNull: false,
            field: "shipping_number",
        },
        totalDiscounts: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "total_discounts",
        },
        totalPaid: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "total_paid",
        },
        totalProducts: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "total_products",
        },
        totalShipping: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "total_shipping",
        },
        totalTax: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "total_tax",
        },
        invoiceNumber: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: "invoice_number",
        },
        invoiceDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "invoice_date",
        },
        shippingDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "shipping_date",
        },
        paymentId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "payment_id",
        },
    }, {
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Order;