DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(10,2)
);

CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(45) UNIQUE NOT NULL,
overhead_cost DECIMAL(10,2) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Shoes", "Clothing", 50.99, 120, 0), ("Hats", "Clothing", 19.99, 300, 0), ("Bowling Balls", "Sporting Goods", 99.99, 10, 0);

INSERT INTO departments (department_name, overhead_cost)
VALUES ("Clothing", 300), ("Sporting Goods", 600);