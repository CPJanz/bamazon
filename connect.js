require("dotenv").config()
let mysql = require("mysql");
let keys = require("./keys");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: keys.mysql.secret,
    database: 'bamazonDB'
});


let donkey = new Connect;
donkey.getProducts(function(results) { console.table(results) });

function Connect() {
    /** Takes in a function, queries the products DB then executes the function with the results */
    this.getProducts = function(inputFunction) {
        connection.connect();
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            connection.end();
            inputFunction(res);
        });
    }

    // TODO: Update items.
    this.purchaseItem = function(itemId, stock_quantity) {
        connection.connect();

        connection.end(function(err) {
            console.log(err);
        });
    }

}