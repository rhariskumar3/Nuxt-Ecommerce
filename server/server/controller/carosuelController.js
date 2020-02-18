"use strict";
const Util = require("../util/index.js");

const Carousel = require("../model/carosuelModel");

exports.list_all = function (req, res) {
    Carousel.getAllCarousel(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.list_all_user = function (req, res) {
    Carousel.getAllCarouselEnabled(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    let new_carousel = new Carousel(req.body);

    if (
        Util.validate(res, new_carousel.title, "Title") &&
        Util.validate(res, new_carousel.image, "Image")
    )
        Carousel.createCarousel(new_carousel, function (err, result) {
            if (err) res.send(err);
            res.json({message: "Carousel added"});
        });
};

exports.read = function (req, res) {
    Carousel.getCarouselById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    Carousel.updateById(req.params.id, new Carousel(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "Carousel updated"}); else res.json({message: "Carousel not updated"});
    });
};

exports.delete = function (req, res) {
    Carousel.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "Carousel successfully deleted"});
    });
};