"use strict";

const Util = require("../util/index.js");

const Carrier = require("../model/carriers");

exports.listAll = function(req, res) {
    Carrier.findAll()
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = function(req, res) {
    Carrier.findOne({ where: { id: req.body.id } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = function(req, res) {
    Carrier.create(req.body)
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = function(req, res) {
    Carrier.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                Carrier.findOne({ where: { id: req.body.id } })
                .then((values) => {
                    res.send(values);
                })
                .catch((err) => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.delete = function(req, res) {
    Carrier.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Carrier successfully deleted" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};