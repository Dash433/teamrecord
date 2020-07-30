// calling in depencencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var { exit } = require("process");
var db = require("./db")

// indormation prompt for the employeesdb

function start() {
    inquirer
        .prompt({
            name: "options",
            type: "list",
            message: "who do you want to view?",
            choices: [
                "View your employees?",
                "View your employees by their department?",
                "View our employees by their role?",
                "Add an employee?",
                "Update an employees role?",
                "Exit"
            ]
        })
        .then(function (answer) {
            console.log(answer);
            switch (answer.options) {
                // sending user to their desired destination
                case "View your employees?":
                    return viewEmp();
                    break;
                case "View your employees by their department?":
                    return viewdept();
                    break;
                case "View our employees by their role?":
                    return viewByRole();
                    break;
                case "Add an employee?":
                    return addEmp();
                    break
                case "Update an employees role?":
                    return updateRole();
                    break;
                default:
                    quit();

            }
        });
};
//allows user to view all employees
async function viewEmp() {
    const employees = await db.viewEmp();
    console.table(employees);
    start();
}
//Organized by employee departments
async function viewdept() {
    const departments = await db.findAllDepartments();
    const deptChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }))
    const { deptID } = await
        prompt([
            {
                type: "list",
                name: "deptID",
                message: "Which department would you like to view?",
                choices: deptChoices
            }
        ])
    const employees = await db.findByDepartment(deptID)
    console.table(employees);
    start();
}
// creates new employee
async function addEmp() {
    const newEmployee = await db.viewEmp();

    start();
}
// quits
function quit() {
    console.log("exit");
    process.exit();
}
start();