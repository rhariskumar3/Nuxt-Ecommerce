`user strict`;

const sql = require("../db/db.js");

//Tax object constructor
const Tax = function (tax) {
    this.name = tax.name,
        this.rate = tax.rate,
        this.enabled = tax.enabled ,
        this.created_at = new Date(),
        this.updated_at = new Date();
};
Tax.createTax = function (newTax, result) {
    sql.query("INSERT INTO tax set ?", newTax, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Tax.getTaxById = function (taxId, result) {
    sql.query("Select * from tax where id = ? ", taxId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Tax.getAllTax = function (result) {
    sql.query("Select * from tax", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Tax.updateById = function (id, tax, result) {
    sql.query(
        "UPDATE tax SET name = ?, rate = ?, enabled = ?, updated_at = ? WHERE id = ?", [
            tax.name,
            tax.rate,
            tax.enabled,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Tax.remove = function (id, result) {
    sql.query("DELETE FROM tax WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Tax;