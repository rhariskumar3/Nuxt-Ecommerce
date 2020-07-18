"use strict";

const Util = require("../util/index.js");

const Country = require("../model/countries");

exports.listAll = function(req, res) {
    Country.findAll()
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    Country.findOne({ where: { id: req.body.id } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function(req, res) {
    Country.create(req.body)
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = function(req, res) {
    Country.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                Country.findOne({ where: { id: req.body.id } })
                .then((values) => {
                    res.send(values);
                })
                .catch((err) => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = function(req, res) {
    Country.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Country successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};