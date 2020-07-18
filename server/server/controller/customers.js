"use strict";

const Util = require("../util/index.js");

const Customers = require("../model/customers");

exports.listAll = function(req, res) {
    Customers.findAll()
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    Customers.findOne({ where: { id: req.params.id } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function(req, res) {
    Customers.create(req.body)
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = function(req, res) {
    Customers.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                Customers.findOne({ where: { id: req.body.id } })
                .then((values) => {
                    res.send(values);
                })
                .catch((err) => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = function(req, res) {
    Customers.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Customers successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};