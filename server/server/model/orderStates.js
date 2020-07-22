`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const OrderState = db.define(
    "orderStates", {
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
        template: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: "order_states",
        timestamps: false,
    }
);

module.exports = OrderState;