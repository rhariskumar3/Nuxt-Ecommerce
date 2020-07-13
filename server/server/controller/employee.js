"use strict";

const Util = require("../util/index.js");

const Employee = require("../model/employee");

exports.listAll = function(req, res) {
    Employee.findAll()
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = function(req, res) {
    Employee.findOne({ where: { id: req.params.id } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = function(req, res) {
    Employee.create(req.body)
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = function(req, res) {
    Employee.update(req.body, { where: { id: req.params.id } })
        .then((updated) => {
            if (updated)
                Employee.findOne({ where: { id: req.params.id } })
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
    Employee.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Employee successfully deleted" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};