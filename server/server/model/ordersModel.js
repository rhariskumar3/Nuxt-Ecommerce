`user strict`;

const sql = require("../db/db.js");

//Orders object constructor
const Orders = function (orders) {
    this.reference = orders.reference ,
        this.customer_id  = orders.customer_id  ,
        this.carrier  = orders.carrier   ,
        this.address_delivery  = orders.address_delivery ,
        this.address_invoice  = orders.address_invoice  ,
        this.current_state  = orders.current_state ,
        this.payment = orders.payment ,
        this.shipping_number = orders.shipping_number,
        this.total_discounts = orders.total_discounts ,
        this.total_paid = orders.total_paid,
        this.total_products = orders.total_products ,
        this.total_shipping = orders.total_shipping,
        this.total_tax = orders.total_tax  ,
        this.invoice_number = orders.invoice_number,
        this.invoice_date = orders.invoice_date ,
        this.shipping_date = orders.shipping_date,
        this.created_at = new Date(),
        this.updated_at = new Date();
};
Orders.createOrders = function (newOrders, result) {
    sql.query("INSERT INTO orders set ?", newOrders, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Orders.getOrdersById = function (ordersId, result) {
    sql.query("Select * from orders where id = ? ", ordersId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Orders.getAllOrders = function (result) {
    sql.query(`SELECT orders.id,
                      reference,
                      CONCAT_WS(' ', first_name, last_name) AS name,
                      total_paid,
                      payment,
                      os.name                               AS order_state,
                      orders.created_at
               FROM orders
                        INNER JOIN customers c on orders.customer_id = c.id
                        INNER JOIN order_states os on orders.current_state = os.id`, function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Orders.updateById = function (id, orders, result) {
    sql.query(
        "UPDATE orders SET reference = ?, customer_id = ?, carrier = ?, address_delivery = ?, address_invoice = ?, current_state = ?, payment = ?, shipping_number = ?, total_discounts = ?, total_paid = ?, total_products = ?, total_shipping = ?, total_tax = ?, invoice_number = ?, invoice_date = ?, shipping_date = ?, updated_at = ? WHERE id = ?", [
            orders.reference ,
            orders.customer_id  ,
            orders.carrier   ,
            orders.address_delivery ,
            orders.address_invoice  ,
            orders.current_state ,
            orders.payment ,
            orders.shipping_number,
            orders.total_discounts ,
            orders.total_paid,
            orders.total_products ,
            orders.total_shipping,
            orders.total_tax  ,
            orders.invoice_number,
            orders.invoice_date ,
            orders.shipping_date,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Orders.remove = function (id, result) {
    sql.query("DELETE FROM orders WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Orders;