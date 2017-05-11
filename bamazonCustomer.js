var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "ditka1985",
    database: "BAMAZON"
});

connection.connect(function (err) {
    if (err) throw err;
    else
    {
        console.log("success");
                connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
            else {
                for (var i = 0; i < results.length; i++) {
                        console.log("Product id: " + results[i].item_id);
                        console.log("Product name: " + results[i].product_name);
                        console.log("Department: " + results[i].department_name);
                        console.log("Current price: " + results[i].price);
                        console.log("Current quantity: " + results[i].stock_quantity);
                        console.log("---------------------");
                }
                inquirer.prompt({
                    name: "product_id",
                    type: "input",
                    message: "What is the id # of the product you want to buy?"
                }).then(function(answer){
                    var product_id = answer.product_id;
                    inquirer.prompt({
                        name: "quantity",
                        type: "input",
                        message: "How many of the item do you care to buy?"
                    }).then(function(answer){
                        console.log(product_id);
                        console.log(answer.quantity);
                    });
                });
            }
        });
    }
});