"use strict";

const carousel = require("../controller/carosuel");
const review = require("../controller/reviews");
const category = require("../controller/category");
const product = require("../controller/products");
const shopData = require("../controller/shopData");
const carriers = require("../controller/carrier");
const customerAddress = require("../controller/customersAddress");
const orders = require("../controller/orders");
const orderDetails = require("../controller/orderDetails");
const paymentMethods = require("../controller/paymentMethods");
const tax = require("../controller/tax");
const session = require("../controller/sessions");

const authenticate = require("../middleware/authenticate");

const upload = require("../config/multer");

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
    app.route("/product/featured").get(product.listAllLiveFeatured);
    app.route("/product/new").get(product.listAllLiveNew);
    app.route("/product/category_url=:url").get(product.listAllByCategoryURL);
    app.route("/product/:url").get(product.readByUrl);
    // shop Data Routes
    app.route("/shop-data").get(shopData.read);
    // Addresses
    app.route("/address/:id").all(authenticate).get(customerAddress.listAllById);
    // carrier Routes
    app.route("/carriers").get(carriers.listAllLive);
    // payment methods Routes
    app
        .route("/payment-methods")
        .all(authenticate)
        .get(paymentMethods.listAllLive);
    // orders Routes
    app
        .route("/order")
        .all(authenticate)
        .post(orders.create)
        .put(orders.paymentSuccess);
    app.route("/order/:id").all(authenticate).get(orders.listAllById);
    app
        .route("/order/:reference/detail")
        .all(authenticate)
        .get(orders.readByReference);
    app.route("/order-details/:id").all(authenticate).get(orderDetails.read);

    // ADMIN ROUTES
    // carousel Routes
    app
        .route("/admin/carousel")
        .all(authenticate)
        .get(carousel.listAll)
        .post(upload.image.single("image"), carousel.create);

    app
        .route("/admin/carousel/:id(\\d+)")
        .all(authenticate)
        .get(carousel.read)
        .put(upload.image.single("image"), carousel.update)
        .delete(carousel.delete);

    app
        .route("/admin/carousel/:id(\\d+)/state")
        .all(authenticate)
        .put(carousel.changeState);

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

    app
        .route("/admin/review/:id(\\d+)/state")
        .all(authenticate)
        .put(review.changeState);

    // category Routes
    app
        .route("/admin/category")
        .all(authenticate)
        .get(category.listAll)
        .post(upload.image.single("image"), category.create);

    app
        .route("/admin/category/:id(\\d+)")
        .all(authenticate)
        .get(category.read)
        .put(upload.image.single("image"), category.update)
        .delete(category.delete);

    app
        .route("/admin/category/:id(\\d+)/state")
        .all(authenticate)
        .put(category.changeState);

    const productUpload = upload.image.fields([
        { name: "image1" },
        { name: "image2" },
        { name: "image3" },
        { name: "image4" },
        { name: "image5" },
        { name: "video" },
    ]);
    // product Routes
    app
        .route("/admin/products")
        .all(authenticate)
        .get(product.listAll)
        .post(productUpload, product.create);

    app
        .route("/admin/products/:id(\\d+)")
        .all(authenticate)
        .get(product.read)
        .put(productUpload, product.update)
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
        .post(orders.create);

    app
        .route("/admin/orders/:id(\\d+)")
        .all(authenticate)
        .get(orders.read)
        .put(orders.update)
        .delete(orders.delete);

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
    app
        .route("/admin/carriers")
        .get(carriers.listAll)
        .post(upload.image.single("image"), carriers.create);

    app
        .route("/admin/carriers/:id(\\d+)")
        .all(authenticate)
        .get(carriers.read)
        .put(upload.image.single("image"), carriers.update)
        .delete(carriers.delete);

    app
        .route("/admin/carriers/:id(\\d+)/state")
        .all(authenticate)
        .put(carriers.changeState);

    // payment methods Routes
    app
        .route("/admin/payment-methods")
        .all(authenticate)
        .get(paymentMethods.listAll)
        .post(upload.image.single("image"), paymentMethods.create);

    app
        .route("/admin/payment-methods/:id(\\d+)")
        .all(authenticate)
        .get(paymentMethods.read)
        .put(upload.image.single("image"), paymentMethods.update)
        .delete(paymentMethods.delete);

    app
        .route("/admin/payment-methods/:id(\\d+)/state")
        .all(authenticate)
        .put(paymentMethods.changeState);

    // tax Routes
    app.route("/admin/tax").all(authenticate).get(tax.listAll).post(tax.create);

    app
        .route("/admin/tax/:id(\\d+)")
        .all(authenticate)
        .get(tax.read)
        .put(tax.update)
        .delete(tax.delete);

    app
        .route("/admin/tax/:id(\\d+)/state")
        .all(authenticate)
        .put(tax.changeState);

    // shop Data Routes
    app
        .route("/admin/shop-data")
        .all(authenticate)
        .get(shopData.read)
        .put(upload.image.single("image"), shopData.update);

    app
        .route("/admin/shop-data/state")
        .all(authenticate)
        .put(shopData.changeState);

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

    app.route("/admin/users").get(authenticate).get(session.users);
};