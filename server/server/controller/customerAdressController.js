"use strict";

const Util = require("../util/index.js");

const CustomerAddress = require("../model/customerAddressModel");

exports.list_all = function (req, res) {
    CustomerAddress.getAllAddress(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    const new_customer_address = new CustomerAddress(req.body);

    if (
        Util.validate(res, new_customer_address.name, "Name") &&
        Util.validate(res, new_customer_address.rate, "Rate")
    )
        CustomerAddress.createAddress(new_customer_address, function (err, result) {
            if (err) res.send(err);
            res.json({message: "CustomerAddress added"});
        });
};

exports.read = function (req, res) {
    CustomerAddress.getAddressById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    CustomerAddress.updateById(req.params.id, new CustomerAddress(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "CustomerAddress updated"});
        else res.json({message: "CustomerAddress not updated"});
    });
};

exports.delete = function (req, res) {
    CustomerAddress.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "CustomerAddress successfully deleted"});
    });
};