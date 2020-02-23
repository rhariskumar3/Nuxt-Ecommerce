"use strict";

const Util = require("../util/index.js");

const Orders = require("../model/ordersModel");

exports.list_all = function (req, res) {
    Orders.getAllOrders(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    const new_order = new Orders(req.body);

    if (
        Util.validate(res, new_order.name, "Name") &&
        Util.validate(res, new_order.rate, "Rate")
    )
        Orders.createOrders(new_order, function (err, result) {
            if (err) res.send(err);
            res.json({message: "Orders added"});
        });
};

exports.read = function (req, res) {
    Orders.getOrdersById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    Orders.updateById(req.params.id, new Orders(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "Orders updated"});
        else res.json({message: "Orders not updated"});
    });
};

exports.delete = function (req, res) {
    Orders.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "Orders successfully deleted"});
    });
};