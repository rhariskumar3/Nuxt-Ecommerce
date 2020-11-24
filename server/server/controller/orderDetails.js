"use strict";

const Util = require("../util/index.js");

const OrderDetails = require("../model/orderDetails");
const Product = require("../controller/products");

exports.listAll = function(req, res) {
    OrderDetails.findAll({ include: { all: true } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    OrderDetails.findOne({ where: { id: req.params.id }, include: { all: true } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.readByOrderId = function(id) {
    return new Promise((resolve, reject) => {
        OrderDetails.findAll({
                where: { orderId: id },
                include: { all: true },
            })
            .then((values) => resolve(values))
            .catch((err) => reject({ message: err.message }));
    });
};

exports.create = function(req, res) {
    OrderDetails.create(req.body)
        .then((values) => {
            res.send(values);
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.createByOrder = function(data, order) {
    return new Promise((resolve, reject) => {
        var detail = [];
        data.forEach((element) => {
            detail.push({
                orderId: order.id,
                productId: element.product.id,
                productName: element.product.name,
                productQuantity: element.count,
                productPrice: element.product.price,
                productWeight: element.product.weight,
                taxName: element.product.tax.name,
                taxRate: element.product.tax.rate,
                shippingPrice: element.product.shippingFee,
            });
        });
        console.log(detail);

        OrderDetails.bulkCreate(detail)
            .then((values) => {
                resolve(values);
                values.forEach((element) => Product.purchased(element));
            })
            .catch((err) => reject({ message: err.message }));
    });
};

exports.update = function(req, res) {
    OrderDetails.update(req.body, { where: { id: req.body.id } })
        .then((updated) => {
            if (updated)
                OrderDetails.findOne({
                    where: { id: req.body.id },
                    include: { all: true },
                })
                .then((values) => {
                    res.send(values);
                })
                .catch((err) => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = function(req, res) {
    OrderDetails.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "OrderDetails successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};