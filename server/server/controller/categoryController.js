"use strict";

const Util = require("../util/index.js");

const Category = require("../model/categoriesModel");

exports.list_all = function(req, res) {
    Category.getAllCategory(function(err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function(req, res) {
    const new_category = new Category(req.body);

    if (
        Util.validate(res, new_category.title, "Title") &&
        Util.validate(res, new_category.image, "Image")
    )
        Category.createCategory(new_category, function(err, result) {
            if (err) res.send(err);
            res.json({ message: "Category added" });
        });
};

exports.read = function(req, res) {
    Category.getCategoryById(req.params.id, function(err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function(req, res) {
    Category.updateById(req.params.id, new Category(req.body), function(
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({ message: "Category updated" });
        else res.json({ message: "Category not updated" });
    });
};

exports.delete = function(req, res) {
    Category.remove(req.params.id, function(err, result) {
        if (err) res.send(err);
        res.json({ message: "Category successfully deleted" });
    });
};

exports.list_all_user = function(req, res) {
    Category.getAllCategoryEnabled(function(err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};