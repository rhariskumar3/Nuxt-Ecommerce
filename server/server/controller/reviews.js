"use strict";

const Util = require("../util/index.js");

const Reviews = require("../model/reviews");

exports.listAll = function(req, res) {
    Reviews.findAll()
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = function(req, res) {
    Reviews.findOne({ where: { id: req.body.id } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = function(req, res) {
    Reviews.create(req.body)
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = function(req, res) {
    Reviews.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                Reviews.findOne({ where: { id: req.body.id } })
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
    Reviews.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Reviews successfully deleted" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};