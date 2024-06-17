# PennyPacker

## Description

PennyPacker is a simple budgeting website that allows you to track your finances and see how much money you have available to spend.

This project was built becuase it's difficult to manage finances and in the current economic climate every penny counts.


## Installation

The first thing that needs to be done is a .env file needs to be made with DB_NAME, DB_USER, DB_PASSWORD. Then the database needs to be initialized using postgreSQL using the schema in the db file. Then you need to run npm i in the command line to get the needed npm packages. After that you can run the server locally using node server.js in the command line. 

## Usage

In order to use PennyPacker users need to create a profile with a username and password. Once they are logged in they start by creating a new budget and adding their income. After they have their income they can start adding categories and assigning amounts to them. This will subtract the total category amounts from the available income. To add transactions they need to click on the name of the category which will take them to a new page where they can add a transaction that will be subtracted from the category's available budget.

![dashboard](assets\images\dashboard.png)    
![dashboard](assets\images\category.png)


## Credits

Paula Gonzales
https://github.com/gonz951

Ben Schwendiman
https://github.com/bschwendiman90

John Shumway
https://github.com/johnnsandra

Charlie Dalton
https://github.com/8bitCharlie

## License

MIT