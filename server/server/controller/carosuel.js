"use strict";
const Util = require("../util/index.js");

const Carousel = require("../model/carousel");

exports.listAll = function(req, res) {
    Carousel.findAll()
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.listAllLive = function(req, res) {
    Carousel.findAll({ where: { enabled: true } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    Carousel.findOne({ where: { id: req.params.id } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function(req, res) {
    if (Util.validate(res, req.file, "Carousel Image")) {
        const obj = {};
        for (let [key, value] of Object.entries(req.body)) obj[key] = value;
        if (req.file) obj.image = req.file.path;
        Carousel.create(obj)
            .then((values) => {
                res.send(values);
            })
            .catch((err) => res.status(500).send({ message: err.message }));
    }
};

exports.update = function(req, res) {
    const obj = {};
    for (let [key, value] of Object.entries(req.body)) obj[key] = value;
    if (req.file) obj.image = req.file.path;
    Carousel.update(obj, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                Carousel.findOne({ where: { id: req.body.id } })
                .then((values) => {
                    res.send(values);
                })
                .catch((err) => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = function(req, res) {
    Carousel.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Carousel successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.changeState = function(req, res) {
    if (
        Util.validate(res, req.params.id, "Carousel ID") &&
        Util.validate(res, req.body.enabled.toString(), "Carousel state")
    ) {
        Carousel.update({ enabled: req.body.enabled }, { where: { id: req.params.id } })
            .then((updated) => {
                if (updated) res.json({ success: true, state: req.body.enabled });
                else res.json({ success: false, state: !req.body.enabled });
            })
            .catch((err) => res.status(500).send({ message: err.message }));
    }
};