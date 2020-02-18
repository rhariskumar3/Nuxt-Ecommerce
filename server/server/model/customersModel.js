`user strict`;

const sql = require("../db/db.js");

//Customers object constructor
const Customers = function (customers) {
    this.first_name = customers.first_name,
        this.last_name = customers.last_name,
        this.email = customers.email ,
        this.password = customers.password,
        this.newsletter = customers.newsletter,
        this.blocked = customers.blocked,
        this.created_at = new Date(),
        this.updated_at = new Date();
};
Customers.createCustomers = function (newCustomers, result) {
    sql.query("INSERT INTO customers set ?", newCustomers, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Customers.getCustomersById = function (customersId, result) {
    sql.query("Select * from customers where id = ? ", customersId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Customers.getAllCustomers = function (result) {
    sql.query("Select * from customers", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Customers.updateById = function (id, customers, result) {
    sql.query(
        "UPDATE customers SET first_name = ?, last_name = ?, email = ?, password = ?, newsletter = ?, blocked = ?, updated_at = ?WHERE id = ?", [
            customers.first_name,
            customers.last_name,
            customers.email,
            customers.password,
            customers.newsletter,
            customers.blocked,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Customers.remove = function (id, result) {
    sql.query("DELETE FROM customers WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Customers;