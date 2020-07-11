`user strict`;

const { Sequelize } = require("sequelize");

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, "", {
    logging: false,
    maxConcurrentQueries: 100,
    dialect: "mysql",
    define: {
        underscored: true,
        freezeTableName: true,
        syncOnAssociation: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true,
    },
    pool: {
        maxConnections: 100,
        minConnections: 0,
        maxIdleTime: 1000,
    },
});

sequelize
    .authenticate()
    .then(function(err) {
        console.log("Connection has been established successfully.");
    })
    .catch(function(err) {
        console.log("Unable to connect to the database:", err);
    });

module.exports = sequelize;