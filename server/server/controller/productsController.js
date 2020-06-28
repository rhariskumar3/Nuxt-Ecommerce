"use strict";

const Util = require("../util/index.js");

const Product = require("../model/productsModel");

exports.list_all = function(req, res) {
    Product.getAllProducts(function(err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function(req, res) {
    const new_category = new Product(req.body);

    if (
        Util.validate(res, new_category.title, "Title") &&
        Util.validate(res, new_category.image, "Image")
    )
        Product.createProducts(new_category, function(err, result) {
            if (err) res.send(err);
            res.json({ message: "Product added" });
        });
};

exports.read = function(req, res) {
    Product.getProductsById(req.params.id, function(err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function(req, res) {
    Product.updateById(req.params.id, new Product(req.body), function(
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({ message: "Product updated" });
        else res.json({ message: "Product not updated" });
    });
};

exports.delete = function(req, res) {
    Product.remove(req.params.id, function(err, result) {
        if (err) res.send(err);
        res.json({ message: "Product successfully deleted" });
    });
};

exports.list_all_under_category_url = function(req, res) {
    Product.getProductsByCategoryUrl(req.params.url, function(err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.list_all_products = function(req, res) {
    Product.getAllProductsEnabled(function(err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};
exports.readByUrl = function(req, res) {
    Product.getProductsByUrl(req.params.url, function(err, result) {
        if (err) res.send(err);
        res.json(result[0]);
    });
};