"use strict";

const Util = require("../util/index.js");

const ShopData = require("../model/shopDataModel");

exports.list_all = function(req, res) {
    ShopData.getAllShopData(function(err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function(req, res) {
    const new_shopData = new ShopData(req.body);

    if (
        Util.validate(res, new_shopData.name, "Name") &&
        Util.validate(res, new_shopData.logo, "Logo")
    )
        ShopData.createShopData(new_shopData, function(err, result) {
            if (err) res.send(err);
            res.json({ message: "ShopData added" });
        });
};

exports.read = function(req, res) {
    ShopData.getShopDataById(req.params.id, function(err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function(req, res) {
    ShopData.updateById(req.params.id, new ShopData(req.body), function(
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({ message: "ShopData updated" });
        else res.json({ message: "ShopData not updated" });
    });
};

exports.delete = function(req, res) {
    ShopData.remove(req.params.id, function(err, result) {
        if (err) res.send(err);
        res.json({ message: "ShopData successfully deleted" });
    });
};