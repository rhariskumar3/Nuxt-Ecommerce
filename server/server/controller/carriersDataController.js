"use strict";

const Util = require("../util/index.js");

const Carrier = require("../model/carriersModel");

exports.list_all = function (req, res) {
    Carrier.getAllCarriers(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    const new_carrier = new Carrier(req.body);

    if (
        Util.validate(res, new_carrier.name, "Name") &&
        Util.validate(res, new_carrier.logo, "Logo")
    )
        Carrier.createCarriers(new_carrier, function (err, result) {
            if (err) res.send(err);
            res.json({message: "Carrier added"});
        });
};

exports.read = function (req, res) {
    Carrier.getCarriersById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    Carrier.updateById(req.params.id, new Carrier(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "Carrier updated"});
        else res.json({message: "Carrier not updated"});
    });
};

exports.delete = function (req, res) {
    Carrier.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "Carrier successfully deleted"});
    });
};