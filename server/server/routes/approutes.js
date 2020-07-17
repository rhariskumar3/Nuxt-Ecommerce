"use strict";

const carousel = require("../controller/carosuel");
const review = require("../controller/reviews");
const category = require("../controller/category");
const product = require("../controller/products");
const shopData = require("../controller/shopData");
const carriers = require("../controller/carrier");
const customers = require("../controller/customers");
const customerAddress = require("../controller/customersAddress");
const employees = require("../controller/employee");
const orders = require("../controller/orders");
const paymentMethods = require("../controller/paymentMethods");
const tax = require("../controller/tax");
const session = require("../controller/sessions");

const authenticate = require("../middleware/authenticate");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = function(app) {
    // USER ROUTES
    // carousel Routes
    app.route("/carousel").get(carousel.listAllLive);
    // reviews Routes
    app.route("/reviews").get(review.listAllLive);
    // category Routes
    app.route("/category").get(category.listAllLive);
    // product Routes
    app.route("/product").get(product.listAllLive);
    app.route("/product/category_url=:url").get(product.listAllByCategoryURL);
    app.route("/product/:url").get(product.readByUrl);
    // shop Data Routes
    app.route("/shop-data").get(shopData.read);

    // ADMIN ROUTES
    // carousel Routes
    app
        .route("/admin/carousel")
        .all(authenticate)
        .get(carousel.listAll)
        .post(carousel.create);

    app
        .route("/admin/carousel/:id(\\d+)")
        .all(authenticate)
        .get(carousel.read)
        .put(carousel.update)
        .delete(carousel.delete);
    // reviews Routes
    app
        .route("/admin/reviews")
        .all(authenticate)
        .get(review.listAll)
        .post(review.create);

    app
        .route("/admin/review/:id(\\d+)")
        .all(authenticate)
        .get(review.read)
        .put(review.update)
        .delete(review.delete);
    // category Routes
    app
        .route("/admin/category")
        .all(authenticate)
        .get(category.listAll)
        .post(category.create);

    app
        .route("/admin/category/:id(\\d+)")
        .all(authenticate)
        .get(category.read)
        .put(category.update)
        .delete(category.delete);

    // product Routes
    app
        .route("/admin/products")
        .all(authenticate)
        .get(product.listAll)
        .post(product.create);

    app
        .route("/admin/products/:id(\\d+)")
        .all(authenticate)
        .get(product.read)
        .put(product.update)
        .delete(product.delete);

    app
        .route("/admin/products/:id(\\d+)/state")
        .all(authenticate)
        .put(product.changeState);

    // orders Routes
    app
        .route("/admin/orders")
        .all(authenticate)
        .get(orders.listAll)
        .post(orders.create, upload.single("image1"));

    app
        .route("/admin/orders/:id(\\d+)")
        .all(authenticate)
        .get(orders.read)
        .put(orders.update)
        .delete(orders.delete);

    // customers Routes
    app
        .route("/admin/customers")
        .all(authenticate)
        .get(customers.listAll)
        .post(customers.create);

    app
        .route("/admin/customers/:id(\\d+)")
        .all(authenticate)
        .get(customers.read)
        .put(customers.update)
        .delete(customers.delete);

    // customer Address Routes
    app
        .route("/admin/customer-addresses")
        .all(authenticate)
        .get(customerAddress.listAll)
        .post(customerAddress.create);

    app
        .route("/admin/customer-addresses/:id(\\d+)")
        .all(authenticate)
        .get(customerAddress.read)
        .put(customerAddress.update)
        .delete(customerAddress.delete);

    // carrier Routes
    app.route("/admin/carriers").get(carriers.listAll).post(carriers.create);

    app
        .route("/admin/carriers/:id(\\d+)")
        .all(authenticate)
        .get(carriers.read)
        .put(carriers.update)
        .delete(carriers.delete);

    // payment methods Routes
    app
        .route("/admin/payment-methods")
        .all(authenticate)
        .get(paymentMethods.listAll)
        .post(paymentMethods.create);

    app
        .route("/admin/payment-methods/:id(\\d+)")
        .all(authenticate)
        .get(paymentMethods.read)
        .put(paymentMethods.update)
        .delete(paymentMethods.delete);

    // tax Routes
    app.route("/admin/tax").all(authenticate).get(tax.listAll).post(tax.create);

    app
        .route("/admin/tax/:id(\\d+)")
        .all(authenticate)
        .get(tax.read)
        .put(tax.update)
        .delete(tax.delete);

    // employees Routes
    app
        .route("/admin/employees")
        .all(authenticate)
        .get(employees.listAll)
        .post(employees.create);

    app
        .route("/admin/employees/:id(\\d+)")
        .all(authenticate)
        .get(employees.read)
        .put(employees.update)
        .delete(employees.delete);

    // shop Data Routes
    app
        .route("/admin/shop-data")
        .all(authenticate)
        .get(shopData.read)
        .put(shopData.update);

    //  Session
    app
        .route("/sessions")
        .post(session.login)
        .delete(authenticate)
        .delete(session.logout);

    app
        .route("/sessions/user")
        .get(authenticate)
        .get(session.user)
        .post(session.register);
};