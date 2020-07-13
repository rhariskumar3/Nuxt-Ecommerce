`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Customer = require("./customers");

const Review = db.define("reviews", {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

Review.belongsTo(Customer);

module.exports = Review;