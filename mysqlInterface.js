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

function Connect() {
    /** Gets an object consisting of all items for sale. Takes in a function using the query result as an imput. */
    this.getProducts = function(inputFunction) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });
    }

    /** Purchases an item. Takes in an itemId, desired stock_quantity and a function to run after the purchase is done.  */
    this.updateItem = function(itemId, stock_quantity, inputFunction) {
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

    this.addItem = function(item, inputFunction) {
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES(?,?,?,?)", [item.product_name, item.department_name, item.price, item.stock_quantity], function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });

    }

    /** Gets item info for all items with low inventory. Takes in a function to run with the result as a parameter */
    this.getLowItems = function(inputFunction) {
        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });
    }

    this.disconnect = function() {
        connection.end();
    }

}

module.exports = Connect;