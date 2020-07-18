"use strict";

const Util = require("../util/index.js");

const ShopData = require("../model/shopData");

exports.read = function(req, res) {
    ShopData.findOne({ include: { all: true } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = function(req, res) {
    const obj = {};
    for (let [key, value] of Object.entries(req.body)) obj[key] = value;
    if (req.file) obj.logo = req.file.path;
    ShopData.update(obj, { where: { id: 1 } })
        .then((updated) => {
            if (updated)
                ShopData.findOne({ where: { id: 1 } })
                .then((values) => {
                    res.send(values);
                })
                .catch((err) => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.changeState = function(req, res) {
    if (
        Util.validate(res, req.body.maintanance.toString(), "Maintenance state")
    ) {
        ShopData.update({ maintanance: req.body.maintanance }, { where: { id: 1 } })
            .then((updated) => {
                if (updated) res.json({ success: true, state: req.body.maintanance });
                else res.json({ success: false, state: !req.body.maintanance });
            })
            .catch((err) => res.status(500).send({ message: err.message }));
    }
};