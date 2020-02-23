`user strict`;

const sql = require("../db/db.js");

//Address object constructor
const Address = function (address) {
    this.customer = address.customer;
    this.first_name = address.first_name;
    this.last_name = address.last_name;
    this.address_1 = address.address_1;
    this.address_2 = address.address_2;
    this.city = address.city;
    this.state = address.state;
    this.country = address.country;
    this.pin_code = address.pin_code;
    this.mobile = address.mobile;
    this.company = address.company;
    this.gst_no = address.gst_no;
    this.active = address.active;
    this.created_at = new Date();
    this.updated_at = new Date();
};
Address.createAddress = function (newAddress, result) {
    sql.query(`INSERT INTO address
               SET ? `, newAddress, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Address.getAddressById = function (addressId, result) {
    sql.query("Select * from address where id = ? ", addressId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Address.getAllAddress = function (result) {
    sql.query(`SELECT address.id,
                      c.first_name,
                      c.last_name,
                      address_1 AS address,
                      pin_code,
                      c2.name   AS city,
                      s.name    AS state,
                      active
               FROM address
                        INNER JOIN customers c on address.customer = c.id
                        INNER JOIN cities c2 on address.city = c2.id
                        INNER JOIN states s on c2.state_id = s.id`, function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Address.updateById = function (id, address, result) {
    sql.query(
            `UPDATE address
             SET customer   = ?,
                 first_name = ?,
                 last_name  = ?,
                 address_1  = ?,
                 address_2  = ?,
                 city       = ?,
                 state      = ?,
                 country    = ?,
                 pin_code   = ?,
                 mobile     = ?,
                 company    = ?,
                 gst_no     = ?,
                 active     = ?,
                 updated_at = ?
             WHERE id = ?`, [
            address.customer,
            address.first_name,
            address.last_name,
            address.address_1,
            address.address_2,
            address.city,
            address.state,
            address.country,
            address.pin_code,
            address.mobile,
            address.company,
            address.gst_no,
            address.active,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Address.remove = function (id, result) {
    sql.query("DELETE FROM address WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Address;