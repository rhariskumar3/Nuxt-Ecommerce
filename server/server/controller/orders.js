"use strict";

const Util = require("../util/index.js");

const Orders = require("../model/orders");
const OrderDetails = require("./orderDetails");

const rzp = require("../config/razorpay");

exports.listAll = function(req, res) {
    Orders.findAll({ include: { all: true }, order: [
                ["createdAt", "DESC"]
            ] })
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
                        const totalValue = result
                            .reduce((a, b) => a + b.totalPrice, 0)
                            .toFixed(2);
                        const totalProducts = result.reduce(
                            (a, b) => a + b.productQuantity,
                            0
                        );
                        const totalShipping = result.reduce(
                            (a, b) => a + b.shippingPrice,
                            0
                        );
                        const totalTax = result.reduce(
                            (a, b) => a + b.totalPrice * (b.taxRate / 100),
                            0
                        );

                        // Payment Creation
                        var options = {
                            amount: parseInt(totalValue * 100),
                            currency: "INR",
                            receipt: values.id,
                            payment_capture: "0",
                            notes: { userId: values.userId },
                        };
                        console.log(options);

                        rzp.pay.orders.create(options, function(err, order) {
                            if (err) {
                                Orders.update({ currentState: 2 }, { where: { id: values.id } });

                                res.json({
                                    status: false,
                                    message: "Payment Failed",
                                });
                            } else {
                                Orders.update({
                                    paymentId: order.id,
                                    currentState: 2,
                                }, { where: { id: values.id } });

                                let datum = order;
                                order.key = process.env.RZP_KEY_ID;
                                order.reference = values.reference;
                                order.desc = totalProducts + " Products";

                                res.json({ status: true, data: datum });
                            }
                        });

                        Orders.update({
                            totalPaid: parseFloat(totalValue),
                            totalProducts: totalProducts,
                            totalShipping: totalShipping,
                            totalTax: totalTax,
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
            if (deleted)
                res.json({ status: true, message: "Orders successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.paymentSuccess = function(req, res) {
    Orders.update({
            paymentId: req.body.paymentId,
            currentState: req.body.paymentId ? 1 : 2,
        }, { where: { reference: req.body.reference } })
        .then((updated) => {
            res.json({
                status: updated,
                message: "Payment " +
                    (req.body.paymentId ? "Succes" : "Failed") +
                    " and Order Updated",
            });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};