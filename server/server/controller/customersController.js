"use strict";

const Util = require("../util/index.js");

const Customers = require("../model/customersModel");

exports.list_all = function (req, res) {
    Customers.getAllCustomers(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    const new_customer = new Customers(req.body);

    if (
        Util.validate(res, new_customer.name, "Name") &&
        Util.validate(res, new_customer.rate, "Rate")
    )
        Customers.createCustomers(new_customer, function (err, result) {
            if (err) res.send(err);
            res.json({message: "Customers added"});
        });
};

exports.read = function (req, res) {
    Customers.getCustomersById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    Customers.updateById(req.params.id, new Customers(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "Customers updated"});
        else res.json({message: "Customers not updated"});
    });
};

exports.delete = function (req, res) {
    Customers.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "Customers successfully deleted"});
    });
};