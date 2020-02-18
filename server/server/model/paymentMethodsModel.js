`user strict`;

const sql = require("../db/db.js");

//PaymentMethods object constructor
const PaymentMethods = function (paymentMethods) {
    this.name = paymentMethods.name ,
        this.logo = paymentMethods.logo ,
        this.merchant_id = paymentMethods.merchant_id  ,
        this.live_key = paymentMethods.live_key,
        this.live_salt = paymentMethods.live_salt ,
        this.live_auth_header = paymentMethods.live_auth_header ,
        this.live_action_url = paymentMethods.live_action_url  ,
        this.live_hook_url = paymentMethods.live_hook_url,
        this.test_key = paymentMethods.test_key,
        this.test_salt = paymentMethods.test_salt ,
        this.test_auth_header = paymentMethods.test_auth_header ,
        this.test_action_url = paymentMethods.test_action_url  ,
        this.test_hook_url = paymentMethods.test_hook_url,
        this.enabled = paymentMethods.enabled,
        this.created_at = new Date(),
        this.updated_at = new Date();
};
PaymentMethods.createPaymentMethods = function (newPaymentMethods, result) {
    sql.query("INSERT INTO payment_methods set ?", newPaymentMethods, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
PaymentMethods.getPaymentMethodsById = function (paymentMethodsId, result) {
    sql.query("Select * from payment_methods where id = ? ", paymentMethodsId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
PaymentMethods.getAllPaymentMethods = function (result) {
    sql.query("Select * from payment_methods", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
PaymentMethods.updateById = function (id, paymentMethods, result) {
    sql.query(
        "UPDATE payment_methods SET name = ?, logo = ?, merchant_id = ?, live_key = ?, live_salt = ?, live_auth_header = ?, live_action_url = ?, live_hook_url = ?, test_key = ?, test_salt = ?, test_auth_header = ?, test_action_url = ?, test_hook_url = ?, enabled = ?, updated_at = ? WHERE id = ?", [
            paymentMethods.name,
            paymentMethods.logo,
            paymentMethods.merchant_id,
            paymentMethods.live_key,
            paymentMethods.live_salt,
            paymentMethods.live_auth_header,
            paymentMethods.live_action_url,
            paymentMethods.live_hook_url,
            paymentMethods.test_key,
            paymentMethods.test_salt,
            paymentMethods.test_auth_header,
            paymentMethods.test_action_url,
            paymentMethods.test_hook_url,
            paymentMethods.enabled,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
PaymentMethods.remove = function (id, result) {
    sql.query("DELETE FROM payment_methods WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = PaymentMethods;