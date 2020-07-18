`user strict`;

const db = require("../db/db.js");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.define(
    "user", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            notEmpty: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            isEmail: true,
            validate: {
                isUnique(value) {
                    return User.findOne({ where: { email: value } }).then((user) => {
                        if (user) throw new Error("Email already exist");
                    });
                },
            },
        },
        password: {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i,
            allowNull: false,
            set(value) {
                this.setDataValue(
                    "password",
                    bcrypt.hashSync(value, bcrypt.genSaltSync(10))
                );
            },
            validate: {
                isLongEnough: function(val) {
                    if (val.length < 7) throw new Error("Password must be 8 digits");
                },
            },
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        freezeTableName: true,
        underscored: true,
    }
);

User.prototype.toJSON = function() {
    let values = Object.assign({}, this.get());

    delete values.password;
    return values;
};

User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

User.prototype.generateToken = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this.id,
        email: this.email,
        name: this.name,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
    });
};

module.exports = User;