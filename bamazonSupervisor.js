let inquirer = require("inquirer");
let DB = require("./mysqlInterface");
const cTable = require('console.table');
let db = new DB;

console.clear();
mainPrompt();

function mainPrompt() {
    console.clear();
    printWelcome();
    inquirer
        .prompt([{
            name: "selection",
            type: "list",
            choices: ["View product sales by department", "Create new department", "Quit"]
        }])
        .then(answers => {
            switch (answers.selection) {
                case "View product sales by department":
                    db.getDepartmentSales(function(input) {
                        console.clear();
                        console.table(input);
                        pausePrompt();
                    })
                    break;
                case "Create new department":
                    console.clear();
                    db.getDepartments(addDepartmentPrompt);
                    break;
                case "Quit":
                    console.log("Goodbye");
                    db.disconnect()
                    break;
                default:
                    console.log("Something went wrong;");
            }
        });
}

function pausePrompt() {
    inquirer
        .prompt([{
            name: "selection",
            type: "input",
            message: "Press any key to continue",
        }])
        .then(answers => {
            mainPrompt();
        });
}

function addDepartmentPrompt(departmentArray) {
    console.table(departmentArray);
    inquirer
        .prompt([{
                name: "department_name",
                type: "input",
                message: "What is the name of the new Department?",
                validate: function(input) {
                    if (input.length === 0) {
                        console.log(" Invalid department name!");
                        return false;
                    } else if (departmentIsADupe(input, departmentArray)) {
                        console.log(" There's already a department named that!");
                        return false
                    }
                    return true;
                }
            },
            {
                name: "overhead_cost",
                type: "input",
                message: "What is the overhead cost for this department?",
                validate: function(input) {
                    if (isNaN(input) || input.length === 0 || input <= 0) {
                        console.log(" Invalid overhead cost!");
                        return false;
                    }
                    return true;
                }
            }
        ])
        .then(answers => {
            console.clear();
            console.log(answers.department_name, "department added to the store.\n");
            db.addDepartment(answers, pausePrompt);
        });
}

/** Takes in a department string and departmentArray, an array of departments returned by the getDepartments function, returns a boolean based on if the department string is a dupe of an existing department_name */
function departmentIsADupe(department, departmentArray) {
    for (i in departmentArray) {
        if (departmentArray[i]["Existing Departments"].toLowerCase() === department.toLowerCase()) {
            return true;
        }
    }
    return false;
}


function printWelcome() {
    console.log("Welcome Supervisor!\nPlease make a selection.\n")
}