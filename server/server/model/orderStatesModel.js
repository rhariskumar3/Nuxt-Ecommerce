`user strict`;

const sql = require("../db/db.js");

//OrderStates object constructor
const OrderStates = function (orderStates) {
    this.name = orderStates.name,
        this.template = orderStates.template;
};
OrderStates.createOrderStates = function (newOrderStates, result) {
    sql.query("INSERT INTO order_states set ?", newOrderStates, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
OrderStates.getOrderStatesById = function (orderStatesId, result) {
    sql.query("Select * from order_states where id = ? ", orderStatesId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
OrderStates.getAllOrderStates = function (result) {
    sql.query("Select * from order_states", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
OrderStates.updateById = function (id, orderStates, result) {
    sql.query(
        "UPDATE order_states SET name = ?, template = ? WHERE id = ?", [
            orderStates.name,
            orderStates.template,
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
OrderStates.remove = function (id, result) {
    sql.query("DELETE FROM order_states WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = OrderStates;