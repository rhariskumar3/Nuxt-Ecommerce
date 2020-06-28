"use strict";

const carousel = require("../controller/carosuelController");
const review = require("../controller/reviewsController");
const category = require("../controller/categoryController");
const product = require("../controller/productsController");
const shopData = require("../controller/shopDataController");
const cities = require("../controller/cityController");
const states = require("../controller/stateController");
const countries = require("../controller/countryController");
const carriers = require("../controller/carriersController");
const customers = require("../controller/customersController");
const customerAddress = require("../controller/customerAdressController");
const employees = require("../controller/employeeController");
const orders = require("../controller/ordersController");
const paymentMethods = require("../controller/paymentMethodsController");
const tax = require("../controller/taxController");

module.exports = function(app) {
    // USER ROUTES
    // carousel Routes
    app
        .route("/carousel")
        .get(carousel.list_all_user);
    // reviews Routes
    app
        .route("/reviews")
        .get(review.list_all_user);
    // category Routes
    app
        .route("/category")
        .get(category.list_all_user);
    // product Routes
    app
        .route("/product")
        .get(product.list_all_products);
    app
        .route("/product/category_url=:url")
        .get(product.list_all_under_category_url);
    app
        .route("/product/:url")
        .get(product.readByUrl);
    // shop Data Routes
    app
        .route("/shop-data")
        .get(shopData.list_all);
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
        .route("/admin/category")
        .get(category.list_all)
        .post(category.create);

    app
        .route("/admin/category/:id(\\d+)")
        .get(category.read)
        .put(category.update)
        .delete(category.delete);

    // product Routes
    app
        .route("/admin/products")
        .get(product.list_all)
        .post(product.create);

    app
        .route("/admin/products/:id(\\d+)")
        .get(product.read)
        .put(product.update)
        .delete(product.delete);

    // orders Routes
    app
        .route("/admin/orders")
        .get(orders.list_all)
        .post(orders.create);

    app
        .route("/admin/orders/:id(\\d+)")
        .get(orders.read)
        .put(orders.update)
        .delete(orders.delete);

    // customers Routes
    app
        .route("/admin/customers")
        .get(customers.list_all)
        .post(customers.create);

    app
        .route("/admin/customers/:id(\\d+)")
        .get(customers.read)
        .put(customers.update)
        .delete(customers.delete);

    // customer Address Routes
    app
        .route("/admin/customer-addresses")
        .get(customerAddress.list_all)
        .post(customerAddress.create);

    app
        .route("/admin/customer-addresses/:id(\\d+)")
        .get(customerAddress.read)
        .put(customerAddress.update)
        .delete(customerAddress.delete);

    // carrier Routes
    app
        .route("/admin/carriers")
        .get(carriers.list_all)
        .post(carriers.create);

    app
        .route("/admin/carriers/:id(\\d+)")
        .get(carriers.read)
        .put(carriers.update)
        .delete(carriers.delete);

    // payment methods Routes
    app
        .route("/admin/payment-methods")
        .get(paymentMethods.list_all)
        .post(paymentMethods.create);

    app
        .route("/admin/payment-methods/:id(\\d+)")
        .get(paymentMethods.read)
        .put(paymentMethods.update)
        .delete(paymentMethods.delete);

    // tax Routes
    app
        .route("/admin/tax")
        .get(tax.list_all)
        .post(tax.create);

    app
        .route("/admin/tax/:id(\\d+)")
        .get(tax.read)
        .put(tax.update)
        .delete(tax.delete);

    // employees Routes
    app
        .route("/admin/employees")
        .get(employees.list_all)
        .post(employees.create);

    app
        .route("/admin/employees/:id(\\d+)")
        .get(employees.read)
        .put(employees.update)
        .delete(employees.delete);

    // shop Data Routes
    app
        .route("/admin/shop-data")
        .get(shopData.list_all)
        .post(shopData.create);

    app
        .route("/admin/shop-data/:id(\\d+)")
        .get(shopData.read)
        .put(shopData.update)
        .delete(shopData.delete);
};