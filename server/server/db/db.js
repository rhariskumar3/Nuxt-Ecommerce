`user strict`;

//local mysql db connection
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;