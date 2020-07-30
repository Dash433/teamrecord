const mysql = require("mysql");
const util = require("util");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employeeDB"
});

connection.connect(function (err) {

    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    // run the start function after the connection is made to prompt the user
   
});

connection.query = util.promisify(connection.query)
class DB {
    constructor(connection) {
        this.connection = connection;
    }
    viewAll()  {
        console.log("hello")
        return this.connection.query("SELECT * FROM employee;")
    }

    findAllDepartments()    {
        return this.connection.query("SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);")
    }

    // findByDepartment(departmentId)  {
    //     return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
    //     departmentId);
    // }

}

module.exports = new DB(connection);