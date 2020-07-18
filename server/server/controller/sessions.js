"use strict";

const Util = require("../util/index.js");

const User = require("../model/user");

exports.users = function(req, res) {
    User.findAll()
        .then(values => res.send(values))
        .catch(err => res.status(500).send({message: err.message}));
};

exports.user = function(req, res) {
    if (Util.validate(res, req.decoded.email, "Email"))
        User.findOne({ where: { email: req.decoded.email } })
        .then(user => {
            if (!user) return res.status(404).send({ message: "User Not found." });
            else return res.json({ data: user });
        })
            .catch(err => res.status(500).send({message: err.message}));
};

exports.login = function(req, res) {
    if (
        Util.validate(res, req.body.email, "Email") &&
        Util.validate(res, req.body.password, "Password")
    )
        User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) return res.status(404).send({ message: "User Not found." });
            user.validPassword(req.body.password).then((result, error) => {
                if (result) {
                    const result = user.generateToken();
                    return res.json({ token: result });
                } else {
                    return res.status(401).json({
                        message: "Invalid Password!",
                    });
                }
            });
        })
            .catch(err => res.status(500).send({message: err.message}));
};

exports.register = function(req, res) {
    if (
        Util.validate(res, req.body.name, "Name") &&
        Util.validate(res, req.body.email, "Email") &&
        Util.validate(res, req.body.password, "Password")
    )
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        .then(user => res.json({message: user.name + " registered successfully"}))
            .catch(err => res.status(500).send({message: err.message}));
};

exports.logout = function(req, res) {
    req.headers.authorization = undefined;
    res.json({ message: "Logged Out" });
};