`user strict`;

const sql = require("../db/db.js");

//Products object constructor
const Products = function (products) {
    this.name = products.name  ,
        this.summary = products.summary ,
        this.description = products.description  ,
        this.category = products.category ,
        this.media = products.media  ,
        this.quantity = products.quantity,
        this.price = products.price   ,
        this.tax = products.tax ,
        this.minimum_quantity = products.minimum_quantity ,
        this.width = products.width,
        this.height = products.height ,
        this.depth = products.depth  ,
        this.weight = products.weight ,
        this.shipping_fee = products.shipping_fee ,
        this.meta_title = products.meta_title,
        this.meta_description = products.meta_description  ,
        this.viewed_times = products.viewed_times,
        this.purchased_times = products.purchased_times ,
        this.enabled = products.enabled,
        this.created_at = new Date(),
        this.updated_at = new Date();
};
Products.createProducts = function (newProducts, result) {
    sql.query("INSERT INTO products set ?", newProducts, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Products.getProductsById = function (productsId, result) {
    sql.query("Select * from products where id = ? ", productsId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Products.getAllProducts = function (result) {
    sql.query("Select * from products", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Products.updateById = function (id, products, result) {
    sql.query(
        "UPDATE products SET name = ?, summary = ?, description = ?, category = ?, media = ?, quantity = ?, price = ?, tax = ?, minimum_quantity = ?, width = ?, height = ?, depth = ?, weight = ?, shipping_fee = ?, meta_title = ?, meta_description = ?, viewed_times = ?, purchased_times = ?, enabled = ?, updated_at = ? WHERE id = ?", [
            products.name,
            products.summary,
            products.description,
            products.category,
            products.media,
            products.quantity,
            products.price,
            products.tax,
            products.minimum_quantity,
            products.width,
            products.height,
            products.depth,
            products.weight,
            products.shipping_fee,
            products.meta_title,
            products.meta_description,
            products.viewed_times,
            products.purchased_times,
            products.enabled,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Products.remove = function (id, result) {
    sql.query("DELETE FROM products WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Products.getProductsByCategoryUrl = function (categoryUrl, result) {
    sql.query(`SELECT products.id, name, media, quantity, price, friendly_url, pm.image_1 FROM products RIGHT JOIN product_media pm on products.media = pm.id WHERE category = (SELECT id FROM categories WHERE friendly_url = ? LIMIT 1) AND enabled = 1;`, categoryUrl, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Products.getAllProductsEnabled = function (result) {
    sql.query("Select * FROM products RIGHT JOIN product_media pm on products.media = pm.id WHERE enabled = 1", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Products.getProductsByUrl = function (friendlyUrl, result) {
    sql.query("Select * FROM products RIGHT JOIN product_media pm on products.media = pm.id WHERE friendly_url = ? AND enabled = 1 LIMIT 1", friendlyUrl, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};

module.exports = Products;