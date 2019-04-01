let inquirer = require("inquirer");
let DB = require("./mysqlInterface");
let db = new DB;

console.clear();
mainPrompt();

function mainPrompt() {
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
                    db.getProducts(function(input) {
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
            message: "What would you like to purchase (input an item_id):",
            validate: function(input) {
                if (isNaN(input) || input.length === 0 || input <= 0 || input > itemArray.length) {
                    console.log(" Invalid item_id!");
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
            // Completes the purchase
            db.purchaseItem(item[0].item_id, item[0].stock_quantity - answers.selection, function() {
                console.clear();
                console.log("Purchase Complete! We've deducted $" + (answers.selection * item[0].price).toFixed(2), "from your bank account.")
                mainPrompt();
            });
        });
}

function printWelcome() {
    console.log("Welcome Valued Customer!\n\n\n\nPlease make a selection.")
}