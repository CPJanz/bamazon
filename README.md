# bamazon

Bamazon is a command line application which simulates a store inventory system.

## Installation Instructions

* Clone the git repo [link](https://github.com/CPJanz/bamazon).

* Run `npm install`.

* Create a `.env` file.

* In the .env file, paste `MYSQL_SECRET=` then your mysql password.

* Start your local mysql server and run the commands in `bamazon.sql`. This will set up the db and seed it with the proper tables and a few items and departments.

* You are now ready to run any of the three bamazon files (bamazonCustomer.js, bamazonManager.js and bamazonSupervisor.js)

## Using Bamazon

### bamazonCustomer.js

![gif](./assets/customer.gif)

* Purchase an item

* Quit

### bamazonManager.js

![gif](./assets/manager.gif)

* View products for sale

* View low inventory products

* Add stock to existing product

* Add new product

* Quit

### bamazonSupervisor.js

![gif](./assets/supervisor.gif)

* View product sales by department

* Create new department

* Quit

## Packages used

* mysql - To interact with the mysql database.
* console.table - To make the tables better looking.
* dotenv - To hide the mysql password.
* inquirer - To handle user input.

## Lessons Learned

* I was pleased with my approach of compartmentalizing the MySql interface into a separate file which made navigating the nested asynchronous functions much easier.

### Note

This projecct has been added to my temporary portfolio [page](http://cpjanz.github.io/Responsive-Portfolio). If I decide that it is one that I will use for my public portfolio I will update the screenshot and add it to the new page.