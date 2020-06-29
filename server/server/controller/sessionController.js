"use strict";
const Util = require("../util/index.js");

exports.list_all_users = function(req, res) {
    res.send("result");
};

exports.user = function(req, res) {
    res.json({ data: { name: "Haris", email: "demo@demo.com", admin: true } });
};

exports.login = function(req, res) {
    res.json({ token: "somerandomtoken" });
};

exports.register = function(req, res) {
    res.send("success");
};

exports.logout = function(req, res) {
    res.send("success");
};