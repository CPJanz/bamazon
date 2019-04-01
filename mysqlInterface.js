require("dotenv").config()
let mysql = require("mysql");
let keys = require("./keys");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: keys.mysql.secret,
    database: 'bamazonDB'
});
connection.connect();

// let donkey = new Connect;
// donkey.getProducts(function(input) {
//     console.table(input)
// });
// donkey.purchaseItem(1, 20, function(input) { console.table(input) });



function Connect() {
    /** Gets an object consisting of all items for sale. Takes in a function using the query result as an imput. */
    this.getProducts = function(inputFunction) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });
    }

    /** Purchases an item. Takes in an itemId, desired stock_quantity and a function to run after the purchase is done.  */
    this.purchaseItem = function(itemId, stock_quantity, inputFunction) {
        connection.query("UPDATE products SET stock_quantity= ? WHERE item_id= ?", [stock_quantity, itemId], function(err, res) {
            if (err) throw err;
            inputFunction();
        });
    }

    /** Gets a specific item. Takes in an itemId and a function to run with the result as a parameter */
    this.getItem = function(itemId, inputFunction) {
        connection.query("SELECT * FROM products WHERE item_id= ?", itemId, function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });
    }

    this.disconnect = function() {
        connection.end();
    }

}

module.exports = Connect;