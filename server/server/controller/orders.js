"use strict";

const Util = require("../util/index.js");

const Orders = require("../model/orders");
const OrderDetails = require("./orderDetails");

exports.listAll = function(req, res) {
    Orders.findAll({ include: { all: true } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.listAllById = function(req, res) {
    Orders.findAll({
            where: { userId: req.params.id },
            include: { all: true },
            order: [
                ["createdAt", "DESC"]
            ],
        })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    Orders.findOne({ where: { id: req.params.id }, include: { all: true } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function(req, res) {
    console.log(req.body);
    if (
        Util.validate(res, req.body.carrierId, "Carrier missing") &&
        Util.validate(res, req.body.payment, "Payment missing") &&
        Util.validate(res, req.body.userId, "User ID missing")
    ) {
        Orders.create(req.body)
            .then((values) => {
                OrderDetails.createByOrder(req.body.carts, values)
                    .then((result) => {
                        res.json({ status: true, message: "Order created" });
                        Orders.update({
                            totalPaid: result.reduce((a, b) => a + b.totalPrice, 0),
                            totalProducts: result.reduce(
                                (a, b) => a + b.productQuantity,
                                0
                            ),
                            totalShipping: result.reduce((a, b) => a + b.shippingPrice, 0),
                            totalTax: result.reduce(
                                (a, b) => a + b.totalPrice * (b.taxRate / 100),
                                0
                            ),
                        }, { where: { id: values.id } });
                    })
                    .catch((err) =>
                        res.status(500).json({ status: false, message: err.message })
                    );
            })
            .catch((err) =>
                res.status(500).json({ status: false, message: err.message })
            );
    }
};

exports.update = function(req, res) {
    Orders.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                Orders.findOne({ where: { id: req.body.id }, include: { all: true } })
                .then((values) => {
                    res.send(values);
                })
                .catch((err) => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = function(req, res) {
    Orders.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Orders successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};