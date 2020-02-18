`user strict`;

const sql = require("../db/db.js");

//State object constructor
const State = function (state) {
    this.name = state.name;
    this.country_id = state.country_id;
    this.zone = state.zone;
};
State.createState = function (newState, result) {
    sql.query("INSERT INTO states set ?", newState, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
State.getStateById = function (stateId, result) {
    sql.query("Select * from states where id = ? ", stateId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
State.getAllState = function (result) {
    sql.query("Select * from states", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
State.updateById = function (id, state, result) {
    sql.query(
        "UPDATE states SET name = ? WHERE id = ?", [
            state.name,
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
State.remove = function (id, result) {
    sql.query("DELETE FROM states WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = State;