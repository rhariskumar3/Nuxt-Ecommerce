"use strict";

exports.validate = function(res, item, name) {
    if (!item) {
        res.status(420).send({success: false, message: name + " not found"});
        return false;
    }
    return true;
};