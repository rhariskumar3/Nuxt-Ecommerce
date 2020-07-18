"use strict";

const Util = require("../util/index.js");

const Category = require("../model/categories");

exports.listAll = function(req, res) {
    Category.findAll()
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.listAllLive = function(req, res) {
    Category.findAll({ where: { enabled: true } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    Category.findOne({ where: { id: req.params.id } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function(req, res) {
    if (Util.validate(res, req.body.title, "Category title")) {
        const obj = {};
        for (let [key, value] of Object.entries(req.body)) obj[key] = value;
        if (req.file) obj.image = req.file.path;
        Category.create(obj)
            .then((values) => {
                res.send(values);
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    }
};

exports.update = function(req, res) {
    const obj = {};
    for (let [key, value] of Object.entries(req.body)) obj[key] = value;
    if (req.file) obj.image = req.file.path;
    Category.update(obj, { where: { id: req.body.id } })
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
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = function(req, res) {
    Category.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Category successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.changeState = function(req, res) {
    if (
        Util.validate(res, req.params.id, "Category ID") &&
        Util.validate(res, req.body.enabled.toString(), "Category state")
    ) {
        Category.update({ enabled: req.body.enabled }, { where: { id: req.params.id } })
            .then((updated) => {
                if (updated) res.json({ success: true, state: req.body.enabled });
                else res.json({ success: false, state: !req.body.enabled });
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    }
};