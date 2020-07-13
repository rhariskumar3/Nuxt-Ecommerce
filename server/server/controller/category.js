"use strict";

const Util = require("../util/index.js");

const Category = require("../model/categories");

exports.listAll = function(req, res) {
    Category.findAll()
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.listAllLive = function(req, res) {
    Category.findAll({ where: { enabled: true } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = function(req, res) {
    Category.findOne({ where: { id: req.params.id } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = function(req, res) {
    Category.create(req.body)
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = function(req, res) {
    Category.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                Category.findOne({ where: { id: req.body.id } })
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
    Category.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Category successfully deleted" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};