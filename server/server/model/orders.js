`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const Address = require("./address");
const Carrier = require("./carriers");
const OrderState = require("./orderStates");
const Customers = require("./customers");

const Order = db.define("orders", {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    reference: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
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
    },
    carrierId: {
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
    },
    payment: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    shippingNumber: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    totalDiscounts: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: "0",
    },
    totalPaid: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: "0",
    },
    totalProducts: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: "0",
    },
    totalShipping: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: "0",
    },
    totalTax: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: "0",
    },
    invoiceNumber: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    invoiceDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    shippingDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    paymentId: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
});

Order.belongsTo(Address, { foreignKey: "addressDelivery" });
Order.belongsTo(Address, { foreignKey: "addressInvoice" });
Order.belongsTo(Carrier);
Order.belongsTo(Customers);
Order.belongsTo(OrderState, { foreignKey: "currentState" });

module.exports = Order;