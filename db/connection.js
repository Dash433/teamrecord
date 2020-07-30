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

module.exports = connection;