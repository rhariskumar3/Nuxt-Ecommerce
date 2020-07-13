"use strict";

const Util = require("../util/index.js");

const ShopData = require("../model/shopData");

exports.read = function(req, res) {
    ShopData.findOne({ include: { all: true } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = function(req, res) {
    ShopData.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                ShopData.findOne({ where: { id: req.body.id } })
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