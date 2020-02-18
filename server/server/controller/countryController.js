"use strict";

const Util = require("../util/index.js");

const Country = require("../model/countriesModel");

exports.list_all = function (req, res) {
    Country.getAllCountry(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    let country = new Country(req.body);

    if (Util.validate(res, country.name, "Name"))
        Country.createCountry(country, function (err, result) {
            if (err) res.send(err);
            res.json({message: "Country added"});
        });
};

exports.read = function (req, res) {
    Country.getCountryById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    Country.updateById(req.params.id, new Country(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "Country updated"}); else res.json({message: "Country not updated"});
    });
};

exports.delete = function (req, res) {
    Country.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "Country successfully deleted"});
    });
};