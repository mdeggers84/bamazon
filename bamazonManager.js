// requires used node packages
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('easy-table');

// sets up parameters for mysql connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bamazon'
});

// display updated table
function displayUpdates(id) {
  var query = 'SELECT * FROM products WHERE ?';
  var table = new Table();

  connection.query(query, { item_id: id }, function (err, res) {
    console.log('Updated Inventory:\n--------------------------');

    // sets up easy-table with current dataset
    res.forEach(function (product) {
      table.cell('Item ID', product.item_id);
      table.cell('Name', product.product_name);
      table.cell('Department', product.department_name);
      table.cell('Price', product.price, Table.number(2));
      table.cell('Qty', product.stock_quantity);
      table.newRow();
    });

    // prints easy-table to screen
    console.log(table.toString());
  });
}

// lists current products available for sale
function listProducts() {
  var query = 'SELECT * FROM products';
  var table = new Table();

  connection.query(query, function (err, res) {
    console.log('Current Product Inventory:\n--------------------------');

    // sets up easy-table with current dataset
    res.forEach(function (product) {
      table.cell('Item ID', product.item_id);
      table.cell('Name', product.product_name);
      table.cell('Department', product.department_name);
      table.cell('Price', product.price, Table.number(2));
      table.cell('Qty', product.stock_quantity);
      table.newRow();
    });

    // prints easy-table to screen
    console.log(table.toString());
  });
  connection.end();
}

// views items with an inventory less than or equal to 5
function viewLowInv() {
  var query = 'SELECT * FROM products WHERE stock_quantity <= 5';
  var table = new Table();

  connection.query(query, function (err, res) {
    console.log('Low Inventory:\n--------------------------');

    res.forEach(function (product) {
      table.cell('Item ID', product.item_id);
      table.cell('Name', product.product_name);
      table.cell('Department', product.department_name);
      table.cell('Price', product.price, Table.number(2));
      table.cell('Qty', product.stock_quantity);
      table.newRow();
    });

    console.log(table.toString());
  });
  connection.end();
}

// allows user to increase/decrease quantity of items currently in inventory
function addToInv() {
  var query = 'SELECT item_id, product_name, stock_quantity FROM products';
  var table = new Table();
  var idArr = [];

  connection.query(query, function (err, res) {
    if (err) throw err;
    res.forEach(function (product) {
      table.cell('Item ID', product.item_id);
      table.cell('Name', product.product_name);
      table.cell('Qty', product.stock_quantity);
      table.newRow();
    });

    for (var i = 0; i < res.length; i++) {
      idArr.push(res[i].item_id.toString());
    }

    console.log(table.toString());

    inquirer.prompt([
      {
        type: 'list',
        message: 'Select product to restock:',
        choices: idArr,
        name: 'id'
      },
      {
        type: 'input',
        message: 'How many would you like to add?',
        name: 'qty',
        validate: function (input) {
          // Declare function as asynchronous, and save the done callback
          var done = this.async();

          // Do async stuff
          setTimeout(function () {
            if (isNaN(parseInt(input, 10)) || parseInt(input, 10) <= 0) {
            // Pass the return value in the done callback
              done('You need to provide a number');
              return;
            }
            // Pass the return value in the done callback
            done(null, true);
          }, 1000);
        }
      }
    ]).then(function (answer) {
      var product = res[parseFloat(answer.id) - 1];
      var newQty = product.stock_quantity + parseInt(answer.qty, 10);
      query = 'UPDATE products SET ? WHERE ?';

      connection.query(query, [
        { stock_quantity: newQty }, { item_id: answer.id }], function (error) {
          if (error) throw error;
          displayUpdates(answer.id);
          connection.end();
        });
    });
  });
}

// allows user to add a new product (row) to the table
function addNewProduct(deptArr) {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Product Name:',
      name: 'product_name'
    },
    {
      type: 'list',
      message: 'Department Name:',
      choices: deptArr,
      name: 'department_name'
    },
    {
      type: 'input',
      message: 'Price:',
      name: 'price',
      validate: function (input) {
          // Declare function as asynchronous, and save the done callback
        var done = this.async();

          // Do async stuff
        setTimeout(function () {
          if (isNaN(parseFloat(input)) || parseFloat(input) <= 0) {
            // Pass the return value in the done callback
            done('You need to provide a positive number');
            return;
          }
            // Pass the return value in the done callback
          done(null, true);
        }, 1000);
      }
    },
    {
      type: 'input',
      message: 'Quantity:',
      name: 'stock_quantity',
      validate: function (input) {
        // Declare function as asynchronous, and save the done callback
        var done = this.async();

        // Do async stuff
        setTimeout(function () {
          if (isNaN(parseInt(input, 10)) || parseInt(input, 10) <= 0) {
            // Pass the return value in the done callback
            done('You need to provide a positive number');
            return;
          }
          // Pass the return value in the done callback
          done(null, true);
        }, 1000);
      }
    }
  ]).then(function (answer) {
    var query = 'INSERT INTO products SET ?';
    var product = {
      product_name: answer.product_name,
      department_name: answer.department_name,
      price: parseFloat(answer.price),
      stock_quantity: parseInt(answer.stock_quantity, 10)
    };

    connection.query(query, product, function (err) {
      if (err) throw err;
      console.log('Product added!');
      connection.end();
    });
  });
}

// initializes application
function startApp() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Please choose an option below:',
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
      name: 'choice'
    }
  ]).then(function (answer) {
    if (answer.choice === 'View Products for Sale') {
      listProducts();
    } else if (answer.choice === 'View Low Inventory') {
      viewLowInv();
    } else if (answer.choice === 'Add to Inventory') {
      addToInv();
    } else if (answer.choice === 'Add New Product') {
      connection.query('SELECT department_name FROM departments', function (err, res) {
        var deptArr = [];
        for (var i = 0; i < res.length; i++) {
          deptArr.push(res[i].department_name);
        }
        addNewProduct(deptArr);
      });
    }
  });
}

// if connection to mySQL is successful, starts app
connection.connect(function (err) {
  if (err) throw err;
  startApp();
});
