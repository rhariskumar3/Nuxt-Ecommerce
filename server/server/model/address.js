`user strict`;

const db = require("../db/db.js");
const { DataTypes } = require("sequelize");

const City = require("./cities");
const Country = require("./countries");
const State = require("./states");
const User = require("./user");

const Address = db.define("address", {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: {
                tableName: "user",
            },
            key: "id",
        },
    },
    name: {
        type: DataTypes.STRING(55),
        allowNull: false,
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
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

Address.belongsTo(City);
Address.belongsTo(State);
Address.belongsTo(Country);
Address.belongsTo(User);

module.exports = Address;