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
            choices: ["Purchase an Item", "Quit"]
        }])
        .then(answers => {
            switch (answers.selection) {
                case "Purchase an Item":
                    // Show user list of all items
                    db.customerGetProducts(function(input) {
                        console.clear();
                        console.table(input);
                        // Prompt user to select which item they'd like to buy.
                        itemIdPrompt(input);
                    });
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

function itemIdPrompt(itemArray) {
    inquirer
        .prompt([{
            name: "selection",
            type: "input",
            message: "What would you like to purchase (input an id):",
            validate: function(input) {
                if (isNaN(input) || input.length === 0 || input <= 0 || input > itemArray.length) {
                    console.log(" Invalid id!");
                    return false;
                }
                return true;
            }
        }])
        .then(answers => {
            // gets item info
            db.getItem(answers.selection, itemQuantityPrompt);


        });
}

//Prompt user for quantity desired
function itemQuantityPrompt(item) {
    inquirer
        .prompt([{
            name: "selection",
            type: "input",
            message: "How many would you like? (Up to " + item[0].stock_quantity + "):",
            validate: function(input) {
                if (isNaN(input) || input.length === 0 || input > item[0].stock_quantity || input < 0) {
                    console.log(" Invalid quantity!");
                    return false;
                }
                return true;
            }
        }])
        .then(answers => {
            let quantityPurchased = item[0].stock_quantity - answers.selection;
            let totalCost = answers.selection * item[0].price;
            let newProductSales = item[0].product_sales + totalCost;
            // Completes the purchase
            db.updateItem(item[0].item_id, quantityPurchased, newProductSales, function() {
                console.clear();
                console.log("Purchase Complete! We've deducted $" + (totalCost).toFixed(2), "from your bank account.\n")
                pausePrompt(mainPrompt);
            });
        });
}

function pausePrompt(inputFunction) {
    inquirer
        .prompt([{
            name: "selection",
            type: "input",
            message: "Press any key to continue",
        }])
        .then(answers => {
            inputFunction()
        });
}

function printWelcome() {
    console.log("Welcome Valued Customer!\n\n\n\nPlease make a selection.\n")
}