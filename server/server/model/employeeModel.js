`user strict`;

const sql = require("../db/db.js");

//Employee object constructor
const Employee = function (employee) {
    this.first_name = employee.first_name,
        this.last_name = employee.last_name,
        this.email = employee.email ,
        this.password = employee.password,
        this.active = employee.active,
        this.admin = employee.admin,
        this.created_at = new Date(),
        this.updated_at = new Date();
};
Employee.createEmployee = function (newEmployee, result) {
    sql.query("INSERT INTO employee set ?", newEmployee, function (err, res) {
        if (err) result(err, null);
        else result(null, res.insertId);
    });
};
Employee.getEmployeeById = function (employeeId, result) {
    sql.query("Select * from employee where id = ? ", employeeId, function (
        err,
        res
    ) {
        if (err) result(err, null);
        else result(null, res);
    });
};
Employee.getAllEmployee = function (result) {
    sql.query("Select * from employee", function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};
Employee.updateById = function (id, employee, result) {
    sql.query(
        "UPDATE employee SET first_name = ?, last_name = ?, email = ?, password = ?, active = ?, admin = ?, updated_at = ? WHERE id = ?", [
            employee.first_name,
            employee.last_name,
            employee.email,
            employee.password,
            employee.active,
            employee.admin,
            new Date(),
            id
        ],
        function (err, res) {
            if (err) result(null, err);
            else result(null, res);
        }
    );
};
Employee.remove = function (id, result) {
    sql.query("DELETE FROM employee WHERE id = ?", [id], function (err, res) {
        if (err) result(null, err);
        else result(null, res);
    });
};

module.exports = Employee;