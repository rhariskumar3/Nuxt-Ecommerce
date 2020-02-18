`user strict`;

const sql = require("../db/db.js");

//Carriers object constructor
const Carriers = function (carriers) {
    this.name = carriers.name;
    this.transit_name = carriers.transit_name;
    this.logo = carriers.logo;
    this.tracking_url = carriers.tracking_url;
    this.max_weight = carriers.max_weight;
    this.enabled = carriers.enabled;
    this.zone = carriers.zone;
    this.created_at = new Date();
    this.updated_at = new Date();
};
Carriers.createCarriers = function (newCarriers, result) {
    sql.query("INSERT INTO carriers set ?", newCarriers, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Carriers.getCarriersById = function (carriersId, result) {
    sql.query("Select * from carriers where id = ? ", carriersId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Carriers.getAllCarriers = function (result) {
    sql.query("Select * from carriers", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Carriers.updateById = function (id, carriers, result) {
    sql.query(
            `UPDATE carriers
             SET name = ?,
                 transit_time = ?,
                 logo = ?,
                 tracking_url = ?,
                 max_weight = ?,
                 enabled = ?,
                 zone = ?,
                 updated_at = ?
             WHERE id = ?`, [
            carriers.name,
            carriers.transit_name,
            carriers.logo,
            carriers.tracking_url,
            carriers.max_weight,
            carriers.enabled,
            carriers.zone,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Carriers.remove = function (id, result) {
    sql.query("DELETE FROM carriers WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Carriers;