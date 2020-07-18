"use strict";

exports.validate = function(res, item, name) {
    if (item) return true;
    res.send({success: false, message: name + " not found"});
    return false;
};