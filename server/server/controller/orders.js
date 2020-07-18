"use strict";

const Util = require("../util/index.js");

const Orders = require("../model/orders");

exports.listAll = function(req, res) {
    Orders.findAll()
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    Orders.findOne({ where: { id: req.params.id } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function(req, res) {
    Orders.create(req.body)
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = function(req, res) {
    Orders.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                Orders.findOne({ where: { id: req.body.id } })
                .then((values) => {
                    res.send(values);
                })
                .catch((err) => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = function(req, res) {
    Orders.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Orders successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};