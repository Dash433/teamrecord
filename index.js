var mysql = require("mysql");
var inquirer = require("inquirer");
const path = require('path');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Dash433!",
    database: "employeeDB"
});
//prompts user of what they want to do first. This will start the process
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    choices();
});
function choices() {
    inquirer
        .prompt({
            type: "list",
            message: "What would you like to do?",
            name: "choices",
            choices: [
                "View your employees?",
                "View your employees by their department?",
                "View our employees by their role?",
                "Add an employee?",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.choices) {
                case "View your employees?":
                   viewEmp();
                    break;
                case "View your employees by their department?":
                    viewdept();
                    break;
                case "View our employees by their role?":
                    viewByRole();
                    break;
                case "Add an employee?":
                    addEmp();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        });
};
//user views all the employees in the database which requires our join
function viewEmp() {
    connection.query("SELECT first_name, last_name, department.name, role.title, role.salary FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.table(res);
        choices();
    });
};
//user views all the employees in the database by their departments
function viewdept() {
    connection.query("SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.table(res);
        choices();
    });
};
//user views all the employees in the database by their roles
function viewByRole() {
    connection.query("SELECT first_name, last_name, role.title FROM((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.table(res);
        choices();
    });
};
//here we add an employee and so we prompt the user and place the info into the db
function addEmp() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Employee's first name:",
                name: "firstname"
            },
            {
                type: "input",
                message: "Employee's last name:",
                name: "lastname"
            },
            {
                type: "input",
                message: "Enter employee's role id:",
                name: "roleid"
            },
            {
                type: "input",
                message: "Employee's manager id:",
                name: "managerid"
            },
        ])
        .then(function (answer) {
             
                connection.query("INSERT INTO employee SET ?",
                    { first_name: answer.firstname, last_name: answer.lastname, role_id: answer.roleid, manager_id: answer.managerid }, function (err, res) {
                        if (err) throw err;
                        console.log("\n Database with added employee. \n");
                       viewEmp();
                    })
            } 
        )
}

function updateRole() {
    connection.query("SELECT * FROM employee", function(err, employees) {
      const choices = employees.map(o => {
        return {value: o.id, name: `${o.first_name} ${o.last_name}`};
      });  
      inquirer
        .prompt([
          {
            type: "rawlist",
            name: "updateEmpRole",
            message: "select employee to update role",
            choices: choices
          },
          {
            type: "list",
            message: "select new role",
            choices: [
               {value: 1, name: "Manager"}, 
                {value: 2, name: "senioranalyist"}, 
                {value: 3, name: "analyistone"}, 
                {value: 4, name: "analyisttwo"}, 
                {value: 5, name: "intern"}
            ],
            name: "newrole"
          }
        ])
        .then(function(answer) {
          console.log("about to update", answer, answer.newrole);
        
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [answer.newrole, answer.updateEmpRole],
            function(err, answer) {
             viewEmp();
            }
          );
        });
    });
  }