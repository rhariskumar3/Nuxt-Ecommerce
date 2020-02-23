`user strict`;

const sql = require("../db/db.js");

//Reviews object constructor
const Reviews = function (reviews) {
    this.title = reviews.title,
        this.description = reviews.description,
        this.customer_id = reviews.customer_id,
        this.enabled = reviews.enabled ,
        this.created_at = new Date(),
        this.updated_at = new Date();
};
Reviews.createReviews = function (newReviews, result) {
    sql.query("INSERT INTO reviews set ?", newReviews, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Reviews.getReviewsById = function (reviewsId, result) {
    sql.query("Select * from reviews where id = ? ", reviewsId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Reviews.getAllReviews = function (result) {
    sql.query(`SELECT reviews.id, title, description, enabled, CONCAT_WS(' ', first_name, last_name) AS name
               FROM reviews
                        INNER JOIN customers c on reviews.customer_id = c.id`, function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Reviews.updateById = function (id, reviews, result) {
    sql.query(
        "UPDATE reviews SET title = ?, customer_id = ?, description = ?, customer_id = ?, enabled = ?, updated_at = ? WHERE id = ?", [
            reviews.title,
            reviews.description,
            reviews.customer_id,
            reviews.enabled,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Reviews.remove = function (id, result) {
    sql.query("DELETE FROM reviews WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Reviews.getAllReviewsEnabled = function (result) {
    sql.query("Select reviews.id, title, description, cus.first_name, cus.last_name FROM reviews RIGHT OUTER JOIN customers cus on reviews.customer_id = cus.id WHERE enabled = 1", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Reviews;