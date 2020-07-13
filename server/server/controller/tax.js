"use strict";

const Util = require("../util/index.js");

const Tax = require("../model/tax");

exports.listAll = function(req, res) {
    Tax.findAll()
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = function(req, res) {
    Tax.findOne({ where: { id: req.params.id } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = function(req, res) {
    Tax.create(req.body)
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = function(req, res) {
    Tax.update(req.body, { where: { id: req.params.id } })
        .then((updated) => {
            if (updated)
                Tax.findOne({ where: { id: req.body.id } })
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
    Tax.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Tax successfully deleted" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};