"use strict";

const Util = require("../util/index.js");

const City = require("../model/citiesModel");

exports.list_all = function (req, res) {
    City.getAllCity(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    let city = new City(req.body);

    if (Util.validate(res, city.name, "Name"))
        City.createCity(city, function (err, result) {
            if (err) res.send(err);
            res.json({message: "City added"});
        });
};

exports.read = function (req, res) {
    City.getCityById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    City.updateById(req.params.id, new City(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "City updated"}); else res.json({message: "City not updated"});
    });
};

exports.delete = function (req, res) {
    City.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "City successfully deleted"});
    });
};