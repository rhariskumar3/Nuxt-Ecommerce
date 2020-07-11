"use strict";

const Util = require("../util/index.js");

const PaymentMethods = require("../model/paymentMethods");

exports.listAll = function(req, res) {
    PaymentMethods.findAll()
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = function(req, res) {
    PaymentMethods.findOne({ where: { id: req.body.id } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = function(req, res) {
    PaymentMethods.create(req.body)
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = function(req, res) {
    PaymentMethods.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                PaymentMethods.findOne({ where: { id: req.body.id } })
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
    PaymentMethods.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "PaymentMethods successfully deleted" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};