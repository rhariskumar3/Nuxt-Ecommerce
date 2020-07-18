"use strict";

const Util = require("../util/index.js");

const PaymentMethods = require("../model/paymentMethods");

exports.listAll = function(req, res) {
    PaymentMethods.findAll()
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    PaymentMethods.findOne({ where: { id: req.params.id } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function(req, res) {
    if (
        Util.validate(res, req.body.name, "Payment method name") &&
        Util.validate(res, req.body.merchantId, "Payment method merchant ID")
    ) {
        const obj = {};
        for (let [key, value] of Object.entries(req.body)) obj[key] = value;
        if (req.file) obj.logo = req.file.path;
        PaymentMethods.create(obj)
            .then((values) => {
                res.send(values);
            })
            .catch((err) => res.status(500).send({ message: err.message }));
    }
};

exports.update = function(req, res) {
    PaymentMethods.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                PaymentMethods.findOne({ where: { id: req.body.id } })
                .then((values) => {
                    res.send(values);
                })
                .catch((err) => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = function(req, res) {
    PaymentMethods.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "PaymentMethods successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.changeState = function(req, res) {
    if (
        Util.validate(res, req.params.id, "Payment Method ID") &&
        Util.validate(res, req.body.enabled.toString(), "Payment Method state")
    ) {
        PaymentMethods.update({ enabled: req.body.enabled }, { where: { id: req.params.id } })
            .then((updated) => {
                if (updated) res.json({ success: true, state: req.body.enabled });
                else res.json({ success: false, state: !req.body.enabled });
            })
            .catch((err) => res.status(500).send({ message: err.message }));
    }
};