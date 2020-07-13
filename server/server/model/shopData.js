`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const City = require("./cities");
const Country = require("./countries");
const State = require("./states");

const ShopData = db.define(
    "shopData", {
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address1: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address2: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        cityId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "cities",
                },
                key: "id",
            },
        },
        stateId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: {
                    tableName: "states",
                },
                key: "id",
            },
        },
        countryId: {
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
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        latitude: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "0",
        },
        longtitude: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "0",
        },
        embeddedMapUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        google: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        facebook: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        youtube: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        maintanance: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        tableName: "shop_data",
        timestamps: false,
    }
);

ShopData.belongsTo(City);
ShopData.belongsTo(State);
ShopData.belongsTo(Country);

module.exports = ShopData;