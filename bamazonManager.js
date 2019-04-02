let inquirer = require("inquirer");
let DB = require("./mysqlInterface");
let db = new DB;

console.clear();
mainPrompt();

// TODO: Add new product


function mainPrompt() {
    printWelcome();
    inquirer
        .prompt([{
            name: "selection",
            type: "list",
            choices: ["View products for sale", "View low inventory products", "Add stock to existing product", "Add new product", "Quit"]
        }])
        .then(answers => {
            switch (answers.selection) {
                case "View products for sale":
                    // View products for sale
                    db.getProducts(function(input) {
                        console.clear();
                        console.table(input);
                        pausePrompt();
                    })
                    break;
                case "View low inventory products":
                    // View low inventory ( inventory_count< 5 in inventory)
                    db.getLowItems(function(input) {
                        console.clear();
                        console.table(input);
                        pausePrompt();
                    })
                    break;
                case "Add stock to existing product":
                    db.getProducts(function(input) {
                        console.clear();
                        console.table(input);
                        addQuantityItemPrompt(input);
                    })
                    break;
                case "Add new product":
                    console.clear();
                    addProductPrompt();
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


function addQuantityItemPrompt(itemArray) {
    inquirer
        .prompt([{
            name: "selection",
            type: "input",
            message: "What item would you like to add stock to? (input an item_id):",
            validate: function(input) {
                if (isNaN(input) || input.length === 0 || input <= 0 || input > itemArray.length) {
                    console.log(" Invalid item_id!");
                    return false;
                }
                return true;
            }
        }])
        .then(answers => {
            addQuantityAmountPrompt(itemArray[answers.selection - 1])
        });
}

function addQuantityAmountPrompt(item) {
    inquirer
        .prompt([{
            name: "selection",
            type: "input",
            message: "How many units would you like to add?:",
            validate: function(input) {
                if (isNaN(input) || input.length === 0 || input <= 0) {
                    console.log(" Invalid Quantity!");
                    return false;
                }
                return true;
            }
        }])
        .then(answers => {
            let updatedTotal = parseInt(item.stock_quantity) + parseInt(answers.selection);
            console.clear();
            console.log(answers.selection, "units of", item.product_name, "added to stock. New total is", updatedTotal, "\n");
            db.updateItem(item.item_id, updatedTotal, pausePrompt);
        });
}

function addProductPrompt() {
    inquirer
        .prompt([{
                name: "product_name",
                type: "input",
                message: "What is the name of the new product?",
                validate: function(input) {
                    if (input.length === 0) {
                        console.log(" Item must be named!");
                        return false;
                    }
                    return true;
                }
            },
            {
                name: "department_name",
                type: "input",
                message: "What department does this new product belong in?",
                validate: function(input) {
                    if (input.length === 0) {
                        console.log(" Item needs a department!");
                        return false;
                    }
                    return true;
                }
            },
            {
                name: "price",
                type: "input",
                message: "How much will we sell this product for?",
                validate: function(input) {
                    if (isNaN(input) || input.length === 0 || input <= 0) {
                        console.log(" Invalid Price!");
                        return false;
                    }
                    return true;
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How many should we purchase for sale?",
                validate: function(input) {
                    if (isNaN(input) || input.length === 0 || input <= 0) {
                        console.log(" Invalid Quantity!");
                        return false;
                    }
                    return true;
                }
            }
        ])
        .then(answers => {
            console.clear();
            console.log(answers.product_name, "added to the store inventory.\n");
            db.addItem(answers, pausePrompt);
        });
}


function printWelcome() {
    console.log("Welcome Manager!\nPlease make a selection.\n")
}