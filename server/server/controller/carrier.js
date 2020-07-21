"use strict";

const Util = require("../util/index.js");

const Carrier = require("../model/carriers");

exports.listAll = function(req, res) {
    Carrier.findAll()
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.listAllLive = function(req, res) {
    Carrier.findAll({ where: { enabled: true } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    Carrier.findOne({ where: { id: req.params.id } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function(req, res) {
    if (Util.validate(res, req.body.name, "Carrier name")) {
        const obj = {};
        for (let [key, value] of Object.entries(req.body)) obj[key] = value;
        if (req.file) obj.logo = req.file.path;
        Carrier.create(obj)
            .then((values) => {
                res.send(values);
            })
            .catch((err) => res.status(500).send({ message: err.message }));
    }
};

exports.update = function(req, res) {
    Carrier.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                Carrier.findOne({ where: { id: req.body.id } })
                .then((values) => {
                    res.send(values);
                })
                .catch((err) => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = function(req, res) {
    Carrier.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Carrier successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.changeState = function(req, res) {
    if (
        Util.validate(res, req.params.id, "Carrier ID") &&
        Util.validate(res, req.body.enabled.toString(), "Carrier state")
    ) {
        Carrier.update({ enabled: req.body.enabled }, { where: { id: req.params.id } })
            .then((updated) => {
                if (updated) res.json({ success: true, state: req.body.enabled });
                else res.json({ success: false, state: !req.body.enabled });
            })
            .catch((err) => res.status(500).send({ message: err.message }));
    }
};