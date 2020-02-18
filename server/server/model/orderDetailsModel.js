`user strict`;

const sql = require("../db/db.js");

//OrderDetails object constructor
const OrderDetails = function (orderDetails) {
    this.order_id = orderDetails.order_id ,
        this.product_id = orderDetails.product_id ,
        this.product_name = orderDetails.product_name  ,
        this.product_quantity = orderDetails.product_quantity,
        this.product_price = orderDetails.product_price ,
        this.product_weight = orderDetails.product_weight,
        this.tax_name = orderDetails.tax_name  ,
        this.tax_rate = orderDetails.tax_rate,
        this.shipping_price = orderDetails.shipping_price ,
        this.total_price = orderDetails.total_price,
        this.created_at = new Date(),
        this.updated_at = new Date();
};
OrderDetails.createOrderDetails = function (newOrderDetails, result) {
    sql.query("INSERT INTO order_details set ?", newOrderDetails, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
OrderDetails.getOrderDetailsById = function (orderDetailsId, result) {
    sql.query("Select * from order_details where id = ? ", orderDetailsId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
OrderDetails.getAllOrderDetails = function (result) {
    sql.query("Select * from order_details", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
OrderDetails.updateById = function (id, orderDetails, result) {
    sql.query(
        "UPDATE order_details SET order_id = ?, product_id = ?, product_name = ?, product_quantity = ?, product_price = ?, product_weight = ?, tax_name = ?, tax_rate = ?, shipping_price = ?, total_price = ?, updated_at = ? WHERE id = ?", [
            orderDetails.order_id,
            orderDetails.product_id,
            orderDetails.product_name,
            orderDetails.product_quantity,
            orderDetails.product_price,
            orderDetails.product_weight,
            orderDetails.tax_name,
            orderDetails.tax_rate,
            orderDetails.shipping_price,
            orderDetails.total_price,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
OrderDetails.remove = function (id, result) {
    sql.query("DELETE FROM order_details WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = OrderDetails;