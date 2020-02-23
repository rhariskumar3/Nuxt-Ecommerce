"use strict";

const Util = require("../util/index.js");

const Employee = require("../model/employeeModel");

exports.list_all = function (req, res) {
    Employee.getAllEmployee(function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
};

exports.create = function (req, res) {
    const new_employee = new Employee(req.body);

    if (
        Util.validate(res, new_employee.email, "Email") &&
        Util.validate(res, new_employee.password, "Password")
    )
        Employee.createEmployee(new_employee, function (err, result) {
            if (err) res.send(err);
            res.json({message: "Employee added"});
        });
};

exports.read = function (req, res) {
    Employee.getEmployeeById(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json(result);
    });
};

exports.update = function (req, res) {
    Employee.updateById(req.params.id, new Employee(req.body), function (
        err,
        result
    ) {
        if (err) res.send(err);
        if (result.changedRows === 1) res.json({message: "Employee updated"});
        else res.json({message: "Employee not updated"});
    });
};

exports.delete = function (req, res) {
    Employee.remove(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({message: "Employee successfully deleted"});
    });
};