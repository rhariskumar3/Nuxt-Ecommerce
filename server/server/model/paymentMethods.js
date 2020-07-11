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
            field: "merchant_id",
        },
        liveKey: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "live_key",
        },
        liveSalt: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "live_salt",
        },
        liveAuthHeader: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "live_auth_header",
        },
        liveActionUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "live_action_url",
        },
        liveHookUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "live_hook_url",
        },
        testKey: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "test_key",
        },
        testSalt: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "test_salt",
        },
        testAuthHeader: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "test_auth_header",
        },
        testActionUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "test_action_url",
        },
        testHookUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "test_hook_url",
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        tableName: "payment_methods",
    }
);

module.exports = PaymentMethod;