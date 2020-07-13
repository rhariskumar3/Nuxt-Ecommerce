"use strict";

const Util = require("../util/index.js");

const db = require("../db/db.js");
const { QueryTypes } = require("sequelize");
const Product = require("../model/products");

exports.listAll = function(req, res) {
    Product.findAll({ include: { all: true } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.listAllLive = function(req, res) {
    Product.findAll({ where: { enabled: true }, include: { all: true } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.listAllByCategoryURL = function(req, res) {
    db.query(
            "SELECT products.id, name, quantity, price, friendly_url, pm.image_1 FROM products RIGHT JOIN product_media pm on products.media_id = pm.id WHERE category_id = (SELECT id FROM categories WHERE friendly_url = :url LIMIT 1) AND enabled = 1;", {
                replacements: { url: req.params.url },
                type: QueryTypes.SELECT,
            }
        )
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.readByUrl = function(req, res) {
    Product.findOne({
            where: { enabled: true, friendlyUrl: req.params.url },
            include: { all: true },
        })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = function(req, res) {
    Product.findOne({ where: { id: req.params.id } })
        .then((values) => {
            res.send(values);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.create = function(req, res) {
    if (
        Util.validate(res, req.body.name, "Product name") &&
        Util.validate(res, req.body.price, "Product price") &&
        Util.validate(res, req.body.categoryId, "Product category")
    ) {
        var product = req.body;
        product.friendlyUrl = toSeoUrl(product.name);
        Product.create(product)
            .then((values) => {
                res.send(values);
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    }
};

exports.update = function(req, res) {
    Product.update(req.body, { where: { id: req.params.id } })
        .then((updated) => {
            if (updated)
                Product.findOne({ where: { id: req.params.id } })
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
    Product.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Product successfully deleted" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

function toSeoUrl(url) {
    return url
        .toString() // Convert to string
        .normalize("NFD") // Change diacritics
        .replace(/[\u0300-\u036f]/g, "") // Remove illegal characters
        .replace(/\s+/g, "-") // Change whitespace to dashes
        .toLowerCase() // Change to lowercase
        .replace(/&/g, "-and-") // Replace ampersand
        .replace(/[^a-z0-9\-]/g, "") // Remove anything that is not a letter, number or dash
        .replace(/-+/g, "-") // Remove duplicate dashes
        .replace(/^-*/, "") // Remove starting dashes
        .replace(/-*$/, ""); // Remove trailing dashes
}