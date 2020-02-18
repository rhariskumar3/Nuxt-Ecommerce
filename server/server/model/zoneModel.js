`user strict`;

const sql = require("../db/db.js");

//Zone object constructor
const Zone = function (zone) {
    this.name = zone.name,
        this.created_at = new Date(),
        this.updated_at = new Date();
};
Zone.createZone = function (newZone, result) {
    sql.query("INSERT INTO zones set ?", newZone, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Zone.getZoneById = function (zoneId, result) {
    sql.query("Select * from zones where id = ? ", zoneId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Zone.getAllZone = function (result) {
    sql.query("Select * from zones", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Zone.updateById = function (id, zone, result) {
    sql.query(
        "UPDATE zones SET name = ?, updated_at = ? WHERE id = ?", [
            zone.name,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Zone.remove = function (id, result) {
    sql.query("DELETE FROM zones WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Zone;