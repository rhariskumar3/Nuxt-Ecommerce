"use strict";

const Util = require("../util/index.js");

const Tax = require("../model/taxModel");

exports.list_all = function (req, res) {
    Tax.getAllTax(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    const new_tax = new Tax(req.body);

    if (
        Util.validate(res, new_tax.name, "Name") &&
        Util.validate(res, new_tax.rate, "Rate")
    )
        Tax.createTax(new_tax, function (err, result) {
            if (err) res.send(err);
            res.json({message: "Tax added"});
        });
};

exports.read = function (req, res) {
    Tax.getTaxById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    Tax.updateById(req.params.id, new Tax(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "Tax updated"});
        else res.json({message: "Tax not updated"});
    });
};

exports.delete = function (req, res) {
    Tax.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "Tax successfully deleted"});
    });
};