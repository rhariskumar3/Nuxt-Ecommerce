`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const PaymentMethod = db.define(
    "paymentMethods", {
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
        logo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        merchantId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        liveKey: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        liveSalt: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        liveAuthHeader: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        liveActionUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        liveHookUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        testKey: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "test_key",
        },
        testSalt: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        testAuthHeader: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        testActionUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        testHookUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        tableName: "payment_methods",
    }
);

module.exports = PaymentMethod;