`user strict`;

const sql = require("../db/db.js");

//Carousel object constructor
const Carousel = function (carousel) {
    this.image = carousel.image;
    this.title = carousel.title;
    this.sub_title = carousel.sub_title;
    this.action = carousel.action;
    this.url = carousel.url;
    this.enabled = carousel.enabled;
    this.created_at = new Date();
    this.updated_at = new Date();
};
Carousel.createCarousel = function (newCarousel, result) {
    sql.query("INSERT INTO carousel set ?", newCarousel, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Carousel.getCarouselById = function (carouselId, result) {
    sql.query("Select * from carousel where id = ? ", carouselId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Carousel.getAllCarousel = function (result) {
    sql.query("Select * from carousel", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Carousel.updateById = function (id, carousel, result) {
    sql.query(
            `UPDATE carousel
             SET image = ?,
                 title = ?,
                 sub_title = ?,
                 action = ?,
                 url = ?,
                 enabled = ?,
                 updated_at = ?
             WHERE id = ?`, [
            carousel.image,
            carousel.title,
            carousel.sub_title,
            carousel.action,
            carousel.url,
            carousel.enabled,
            new Date(),
            carousel.image,
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Carousel.remove = function (id, result) {
    sql.query("DELETE FROM carousel WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Carousel.getAllCarouselEnabled = function (result) {
    sql.query("Select id, image, title, sub_title, action, url from carousel WHERE enabled = 1", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Carousel;