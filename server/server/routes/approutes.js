"use strict";

const carousel = require("../controller/carosuelController");
const review = require("../controller/reviewsController");
const category = require("../controller/categoryController");
const product = require("../controller/productsController");
const shopData = require("../controller/shopDataController");
const cities = require("../controller/cityController");
const states = require("../controller/stateController");
const countries = require("../controller/countryController");

module.exports = function (app) {
    // USER ROUTES
    // carousel Routes
    app
        .route("/carousel")
        .get(carousel.list_all_user)
    // reviews Routes
    app
        .route("/reviews")
        .get(review.list_all_user)
    // category Routes
    app
        .route("/category")
        .get(category.list_all_user)
    // product Routes
    app
        .route("/product")
        .get(product.list_all_user)
    app
        .route("/product/category_url=:url")
        .get(product.list_all_under_category_url)
    app
        .route("/product/:url")
        .get(product.readByUrl)
    // shop Data Routes
    app
        .route("/shop-data")
        .get(shopData.list_all)
    // ADMIN ROUTES
    // carousel Routes
    app
        .route("/admin/carousel")
        .get(carousel.list_all)
        .post(carousel.create);

    app
        .route("/admin/carousel/:id(\\d+)")
        .get(carousel.read)
        .put(carousel.update)
        .delete(carousel.delete);
    // reviews Routes
    app
        .route("/admin/reviews")
        .get(review.list_all)
        .post(review.create);

    app
        .route("/admin/review/:id(\\d+)")
        .get(review.read)
        .put(review.update)
        .delete(review.delete);
    // category Routes
    app
        .route("/category")
        .get(category.list_all)
        .post(category.create);

    app
        .route("/category/:id(\\d+)")
        .get(category.read)
        .put(category.update)
        .delete(category.delete);

    // product Routes
    app
        .route("/admin/product")
        .get(product.list_all)
        .post(product.create);

    app
        .route("/admin/product/:id(\\d+)")
        .get(product.read)
        .put(product.update)
        .delete(product.delete);

    // shop Data Routes
    app
        .route("/admin/shop-data")
        .get(product.list_all)
        .post(product.create);

    app
        .route("/admin/shop-data/:id(\\d+)")
        .get(product.read)
        .put(product.update)
        .delete(product.delete);
};