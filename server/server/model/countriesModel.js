`user strict`;

const sql = require("../db/db.js");

//Country object constructor
const Country = function (country) {
    this.name = country.name;
    this.sortname = country.sortname;
    this.phonecode = country.phonecode;
};
Country.createCountry = function (newCountry, result) {
    sql.query("INSERT INTO countries set ?", newCountry, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Country.getCountryById = function (countryId, result) {
    sql.query("Select * from countries where id = ? ", countryId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Country.getAllCountry = function (result) {
    sql.query("Select * from countries", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Country.updateById = function (id, country, result) {
    sql.query(
        "UPDATE countries SET name = ? WHERE id = ?", [
            country.name,
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Country.remove = function (id, result) {
    sql.query("DELETE FROM countries WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Country;