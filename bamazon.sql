DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "clothing", 3.10, 120);



-- UPDATE products SET stock_quantity=4 WHERE item_id=1;
-- SELECT * FROM products