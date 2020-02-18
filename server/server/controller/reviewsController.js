"use strict";

const Util = require("../util/index.js");

const Reviews = require("../model/reviewsModel");

exports.list_all = function (req, res) {
    Reviews.getAllReviews(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.list_all_user = function (req, res) {
    Reviews.getAllReviewsEnabled(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    let new_carousel = new Reviews(req.body);

    if (
        Util.validate(res, new_carousel.title, "Title") &&
        Util.validate(res, new_carousel.image, "Image")
    )
        Reviews.createReviews(new_carousel, function (err, result) {
            if (err) res.send(err);
            res.json({message: "Reviews added"});
        });
};

exports.read = function (req, res) {
    Reviews.getReviewsById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    Reviews.updateById(req.params.id, new Reviews(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "Reviews updated"}); else res.json({message: "Reviews not updated"});
    });
};

exports.delete = function (req, res) {
    Reviews.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "Reviews successfully deleted"});
    });
};