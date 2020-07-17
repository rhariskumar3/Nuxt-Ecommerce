"use strict";
const Util = require("../util/index.js");

const Carousel = require("../model/carousel");

exports.listAll = function(req, res) {
    Carousel.findAll()
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.listAllLive = function(req, res) {
    Carousel.findAll({ where: { enabled: true } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = function(req, res) {
    Carousel.findOne({ where: { id: req.params.id } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = function(req, res) {
    if (Util.validate(res, req.body.image, "Carousel Image")) {
        Carousel.create(req.body)
            .then((values) => {
                res.send(values);
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    }
};

exports.update = function(req, res) {
    Carousel.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                Carousel.findOne({ where: { id: req.body.id } })
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
    Carousel.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Carousel successfully deleted" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};