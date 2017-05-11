// adds necessary node packages
var mysql = require('mysql');
var prompt = require('prompt');
var Table = require('easy-table');

// sets up connection to the mySQL database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bamazon'
});

// updates stock_quantity in the table and prints total price to console
function completeOrder(id, qty, stock, price) {
  var newQty = stock - qty;
  var total = price * qty;
  var query = 'UPDATE products SET ? WHERE ?';

  connection.query(query, [{ stock_quantity: newQty }, { item_id: id }], function (err) {
    if (err) throw err;
  });

  console.log('Thank you for your purchase. Your total is $' + total.toFixed(2) + '.');
}

// checks if there are enough items in inv to complete purchase
// if there are, completes the order. If not, restarts program.
function invCheck(id, qty) {
  var query = 'SELECT stock_quantity, price FROM products WHERE ?';
  connection.query(query, { item_id: id }, function (err, res) {
    if (err) throw err;
    if (res.stock_quantity < qty) {
      console.log('Insufficient quantity!');
      promptUser();
    } else {
      completeOrder(id, qty, res[0].stock_quantity, res[0].price);
      connection.end();
    }
  });
}

// asks user which item they'd like to purchase along with how many of that item.
function promptUser() {
  var schema = {
    properties: {
      id: {
        description: 'Please enter the id of the product you would like to buy.',
        pattern: /^\d+$/,
        message: 'You must choose a number.'
      },
      qty: {
        description: 'How many would you like to purchase?',
        pattern: /^\d+$/,
        message: 'You must choose a number.'
      }
    }
  };
  prompt.start();
  prompt.get(schema, function (err, res) {
    if (err) throw err;
    invCheck(res.id, res.qty);
  });
}

// initializes the program
function startApp() {
  connection.query('SELECT * FROM products', function (err, res) {
    var t = new Table();
    if (err) throw err;
    res.forEach(function (product) {
      t.cell('Item ID', product.item_id);
      t.cell('Name', product.product_name);
      t.cell('Qty', product.stock_quantity);
      t.newRow();
    });
    console.log(t.toString());
    promptUser();
  });
}

// connects to mySQL server and starts app if no errors are thrown.
connection.connect(function (err) {
  if (err) throw err;
  startApp();
});

