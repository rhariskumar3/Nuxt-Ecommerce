`user strict`;

const sql = require("../db/db.js");

//ProductMedia object constructor
const ProductMedia = function (productMedia) {
    this.image_1 = productMedia.image_1 ,
        this.image_2 = productMedia.image_2 ,
        this.image_3 = productMedia.image_3  ,
        this.image_4 = productMedia.image_4,
        this.image_5 = productMedia.image_5 ,
        this.video = productMedia.video,
        this.created_at = new Date(),
        this.updated_at = new Date();
};
ProductMedia.createProductMedia = function (newProductMedia, result) {
    sql.query("INSERT INTO product_media set ?", newProductMedia, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
ProductMedia.getProductMediaById = function (productMediaId, result) {
    sql.query("Select * from product_media where id = ? ", productMediaId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
ProductMedia.getAllProductMedia = function (result) {
    sql.query("Select * from product_media", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
ProductMedia.updateById = function (id, productMedia, result) {
    sql.query(
        "UPDATE product_media SET image_1 = ?, image_2 = ?, image_3 = ?, image_4 = ?, image_5 = ?, video = ?, updated_at = ? WHERE id = ?", [
            productMedia.image_1,
            productMedia.image_2,
            productMedia.image_3,
            productMedia.image_4,
            productMedia.image_5,
            productMedia.video,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
ProductMedia.remove = function (id, result) {
    sql.query("DELETE FROM product_media WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = ProductMedia;