"use strict";

const Util = require("../util/index.js");

const db = require("../db/db.js");
const { Sequelize, QueryTypes } = require("sequelize");
const Product = require("../model/products");

const MediaController = require("../controller/productMedia");

exports.listAll = function(req, res) {
    Product.findAll({ include: { all: true } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.listAllLive = function(req, res) {
    Product.findAll({ where: { enabled: true }, include: { all: true } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.listAllByCategoryURL = function(req, res) {
    db.query(
            "SELECT products.id, name, quantity, price, friendly_url as friendlyUrl, pm.image_1 as image FROM products RIGHT JOIN product_media pm on products.media_id = pm.id WHERE category_id = (SELECT id FROM categories WHERE friendly_url = :url LIMIT 1) AND enabled = 1;", {
                replacements: { url: req.params.url },
                type: QueryTypes.SELECT,
            }
        )
        .then((values) => {
            values.forEach((value) => {
                if (value.image) value.image = fileToUrl(value.image);
            });
            res.send(values);
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.readByUrl = function(req, res) {
    Product.findOne({
            where: { enabled: true, friendlyUrl: req.params.url },
            include: { all: true },
        })
        .then((values) => {
            res.send(values);
            values.increment("viewedTimes");
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    Product.findOne({ where: { id: req.params.id } })
        .then((values) => {
            res.send(values);
            values.increment("viewedTimes");
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function(req, res) {
    if (
        Util.validate(res, req.body.name, "Product name") &&
        Util.validate(res, req.body.price, "Product price") &&
        Util.validate(res, req.body.categoryId, "Product category") &&
        Util.validate(res, req.body.taxId, "Product Tax")
    ) {
        Product.findAll({ where: { name: req.body.name } })
            .then((products) => {
                if (products.length > 0)
                    return res.json({
                        status: false,
                        message: "Product already exists.",
                    });

                if (req.files)
                    MediaController.createLocal(req.files).then((result) => {
                        const obj = {};
                        for (let [key, value] of Object.entries(req.body)) obj[key] = value;
                        if (result.data) obj.mediaId = result.data.id;

                        Product.create(obj)
                            .then((values) => res.send(values))
                            .catch((err) => res.status(500).send({ message: err.message }));
                    });
                else
                    Product.create(req.body)
                    .then((values) => res.send(values))
                    .catch((err) => res.status(500).send({ message: err.message }));
            })
            .catch((err) => res.status(500).send({ message: err.message }));
    }
};

exports.update = function(req, res) {
    Product.update(req.body, { where: { id: req.params.id } })
        .then((updated) => {
            if (updated)
                Product.findOne({ where: { id: req.params.id } })
                .then((values) => res.send(values))
                .catch((err) => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = function(req, res) {
    Product.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Product successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.changeState = function(req, res) {
    if (
        Util.validate(res, req.params.id, "Product ID") &&
        Util.validate(res, req.body.enabled.toString(), "Product state")
    ) {
        Product.update({ enabled: req.body.enabled }, { where: { id: req.params.id } })
            .then((updated) => {
                if (updated) res.json({ success: true, state: req.body.enabled });
                else res.json({ success: false, state: !req.body.enabled });
            })
            .catch((err) => res.status(500).send({ message: err.message }));
    }
};

exports.purchased = function(data) {
    Product.findOne({ where: { id: data.productId } })
        .then((values) => {
            values.increment("purchasedTimes", { by: data.productQuantity });
            values.decrement("quantity", { by: data.productQuantity });
        })
        .catch((err) => print(err));
};

exports.listAllLiveFeatured = function(req, res) {
    Product.findAll({
            order: [Sequelize.fn("RAND")],
            limit: 10,
            where: { enabled: true },
            include: { all: true },
        })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.listAllLiveNew = function(req, res) {
    Product.findAll({
            order: [Sequelize.fn("RAND")],
            limit: 10,
            where: { enabled: true },
            include: { all: true },
        })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

const fileToUrl = (url) =>
    url.includes("http") ?
    url ?
    url :
    url :
    url ?
    "http://" + process.env.API_HOST + ":" + process.env.API_PORT + "/" + url :
    url;