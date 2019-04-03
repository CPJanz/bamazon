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
    /** Gets an object consisting of all items for sale.  Takes in a function and uses the query result as its parameter. */
    this.getProducts = function(inputFunction) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });
    }

    /** Gets an object consisting of all the items with columns meant to be shown to a customer. Takes in a function and uses the query result as its parameter. */
    this.customerGetProducts = function(inputFunction) {
        connection.query("SELECT item_id as id, product_name as product, price, stock_quantity as quantity FROM products", function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });
    }

    /** Gets an object consisting of all departments. Takes in a function which uses the query result as its parameter. */
    this.getDepartments = function(inputFunction) {
        connection.query("SELECT department_name as 'Existing Departments' FROM departments", function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });
    }

    /** Purchases an item. Takes in an itemId, desired stock_quantity and a function which uses the query result as its parameter.  */
    this.updateItem = function(itemId, stock_quantity, product_sales, inputFunction) {
        connection.query("UPDATE products SET stock_quantity= ?, product_sales= ? WHERE item_id= ?", [stock_quantity, product_sales, itemId], function(err, res) {
            if (err) throw err;
            inputFunction();
        });
    }

    /** Gets a specific item. Takes in an itemId and a function which uses the query result as its parameter */
    this.getItem = function(itemId, inputFunction) {
        connection.query("SELECT * FROM products WHERE item_id= ?", itemId, function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });
    }

    /** Gets a list of the departments and displays their sales data. Takes in a function which uses the query result as its parameter. */
    this.getDepartmentSales = function(inputFunction) {
        connection.query("SELECT departments.department_id, departments.department_name, departments.overhead_cost, SUM(products.product_sales) AS sales, SUM(products.product_sales) - departments.overhead_cost as profit FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY department_name", function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });
    }

    /** Adds new product to the products table. Takes in a product_name, department_name, price, stock_quantity, and a function to run with the result as a parameter */
    this.addItem = function(item, inputFunction) {
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES(?,?,?,?,0)", [item.product_name, item.department_name, item.price, item.stock_quantity], function(err, res) {
            if (err) throw err;
            inputFunction(res);
        });
    }

    /** Adds new department to the departments table. Takes in a department_name, overhead_cost, and a function to run with the result as a parameter */
    this.addDepartment = function(department, inputFunction) {
        connection.query("INSERT INTO departments (department_name, overhead_cost) VALUES(?,?)", [department.department_name, department.overhead_cost], function(err, res) {
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