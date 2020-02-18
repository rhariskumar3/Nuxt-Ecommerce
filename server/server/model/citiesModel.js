`user strict`;

const sql = require("../db/db.js");

//City object constructor
const City = function (city) {
    this.name = city.name;
    this.state_id = city.state_id;
};
City.createCity = function (newCity, result) {
    sql.query("INSERT INTO cities set ?", newCity, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
City.getCityById = function (cityId, result) {
    sql.query("Select * from cities where id = ? ", cityId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
City.getAllCity = function (result) {
    sql.query("Select * from cities", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
City.updateById = function (id, city, result) {
    sql.query(
        "UPDATE cities SET name = ? WHERE id = ?", [
            city.name,
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
City.remove = function (id, result) {
    sql.query("DELETE FROM cities WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = City;