`user strict`;

const sql = require("../db/db.js");

//Category object constructor
const Category = function (category) {
    this.title = category.title;
    this.description = category.description;
    this.image = category.image;
    this.friendly_url = category.friendly_url;
    this.enabled = category.enabled;
    this.created_at = new Date();
    this.updated_at = new Date();
};
Category.createCategory = function (newCategory, result) {
    sql.query("INSERT INTO categories set ? ", newCategory, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Category.getCategoryById = function (categoryId, result) {
    sql.query("Select * from categories where id = ? ", categoryId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Category.getAllCategory = function (result) {
    sql.query("Select * from categories", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Category.updateById = function (id, category, result) {
    sql.query(
            `UPDATE categories
             SET title = ?,
                 description = ?,
                 image = ?,
                 friendly_url = ?,
                 enabled = ?,
                 updated_at = ?
             WHERE id = ?`, [category.title, category.description, new Date(), category.image, category.friendly_url, category.enabled, new Date(), id],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Category.remove = function (id, result) {
    sql.query("DELETE FROM categories WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Category.getAllCategoryEnabled = function (result) {
    sql.query("Select id, title, description, image, friendly_url from categories WHERE enabled = 1", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Category;