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
            allowNull: true,
            get() {
                return fileToUrl(this.getDataValue("logo"));
            },
        },
        merchantId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        liveKey: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        liveSalt: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        liveAuthHeader: {
            type: DataTypes.STRING(255),
            alalowNull: true,
        },
        liveActionUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        liveHookUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        testKey: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        testSalt: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        testAuthHeader: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        testActionUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        testHookUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
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

const fileToUrl = (url) => url ? (url.toString().includes("http") ? url : "http://" + process.env.API_HOST + ":" + process.env.API_PORT + "/" + url) : url;

module.exports = PaymentMethod;