"use strict";

const Util = require("../util/index.js");

const State = require("../model/statesModel");

exports.list_all = function (req, res) {
    State.getAllState(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    let state = new State(req.body);

    if (Util.validate(res, state.name, "Name"))
        State.createState(state, function (err, result) {
            if (err) res.send(err);
            res.json({message: "State added"});
        });
};

exports.read = function (req, res) {
    State.getStateById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    State.updateById(req.params.id, new State(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "State updated"}); else res.json({message: "State not updated"});
    });
};

exports.delete = function (req, res) {
    State.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "State successfully deleted"});
    });
};