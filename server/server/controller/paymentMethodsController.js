"use strict";

const Util = require("../util/index.js");

const PaymentMethods = require("../model/paymentMethodsModel");

exports.list_all = function (req, res) {
    PaymentMethods.getAllPaymentMethods(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    const new_paymentMethods = new PaymentMethods(req.body);

    if (
        Util.validate(res, new_paymentMethods.name, "Name") &&
        Util.validate(res, new_paymentMethods.merchant_id, "Merchant ID")
    )
        PaymentMethods.createPaymentMethods(new_paymentMethods, function (err, result) {
            if (err) res.send(err);
            res.json({message: "PaymentMethods added"});
        });
};

exports.read = function (req, res) {
    PaymentMethods.getPaymentMethodsById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    PaymentMethods.updateById(req.params.id, new PaymentMethods(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "PaymentMethods updated"});
        else res.json({message: "PaymentMethods not updated"});
    });
};

exports.delete = function (req, res) {
    PaymentMethods.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "PaymentMethods successfully deleted"});
    });
};