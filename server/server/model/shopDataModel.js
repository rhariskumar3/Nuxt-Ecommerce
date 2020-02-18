`user strict`;

const sql = require("../db/db.js");

//ShopData object constructor
const ShopData = function (shopData) {
    this.name = shopData.name,
        this.description = shopData.description,
        this.logo = shopData.logo,
        this.address_1 = shopData.address_1,
        this.address_2 = shopData.address_2,
        this.city_id = shopData.city_id,
        this.state_id = shopData.state_id,
        this.country_id = shopData.country_id,
        this.pin_code = shopData.pin_code,
        this.email = shopData.email,
        this.mobile = shopData.mobile,
        this.latitude = shopData.latitude,
        this.longtitude = shopData.longtitude,
        this.google = shopData.google,
        this.facebook = shopData.facebook,
        this.youtube = shopData.youtube,
        this.maintanance = shopData.maintanance;
};
ShopData.createShopData = function (newShopData, result) {
    sql.query("INSERT INTO shop_data set ?", newShopData, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
ShopData.getShopDataById = function (shopDataId, result) {
    sql.query("Select * from shop_data where id = ? ", shopDataId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
ShopData.getAllShopData = function (result) {
    sql.query("Select * from shop_data", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
ShopData.updateById = function (id, shopData, result) {
    sql.query(
        "UPDATE shop_data SET name = ?, description = ?, logo = ?, address_1 = ?, address_2 = ?, city_id = ?, state_id = ?, country_id = ?, pin_code = ?, email = ?, mobile = ?, latitude = ?, longtitude = ?, google = ?, facebook = ?, youtube = ?, maintanance = ? WHERE id = ?", [
            shopData.name,
            shopData.description,
            shopData.logo,
            shopData.address_1,
            shopData.address_2,
            shopData.city_id,
            shopData.state_id,
            shopData.country_id,
            shopData.pin_code,
            shopData.email,
            shopData.mobile,
            shopData.latitude,
            shopData.longtitude,
            shopData.google,
            shopData.facebook,
            shopData.youtube,
            shopData.maintanance,
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
ShopData.remove = function (id, result) {
    sql.query("DELETE FROM shop_data WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = ShopData;