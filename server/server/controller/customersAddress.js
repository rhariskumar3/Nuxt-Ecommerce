"use strict";

const Util = require("../util/index.js");

const CustomerAddress = require("../model/customers");

exports.listAll = function(req, res) {
    CustomerAddress.findAll()
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = function(req, res) {
    CustomerAddress.findOne({ where: { id: req.body.id } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = function(req, res) {
    CustomerAddress.create(req.body)
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = function(req, res) {
    CustomerAddress.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                CustomerAddress.findOne({ where: { id: req.body.id } })
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
    CustomerAddress.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted)
                res.json({ message: "CustomerAddress successfully deleted" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};