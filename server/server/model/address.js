`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Address = db.define(
    "address", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        customer: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "customers",
                },
                key: "id",
            },
        },
        firstName: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "first_name",
        },
        lastName: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "last_name",
        },
        address1: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "address_1",
        },
        address2: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "address_2",
        },
        city: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "cities",
                },
                key: "id",
            },
        },
        state: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "states",
                },
                key: "id",
            },
        },
        country: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "countries",
                },
                key: "id",
            },
        },
        pinCode: {
            type: DataTypes.STRING(8),
            allowNull: false,
            field: "pin_code",
        },
        mobile: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        gstNo: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "gst_no",
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Address;