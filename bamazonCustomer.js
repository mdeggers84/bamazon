var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bamazon'
});

function completeOrder(id, qty, stock, price) {
  var newQty = stock - qty;
  var total = price * qty;
  var query = 'UPDATE products SET ? WHERE ?';

  connection.query(query, [{ stock_quantity: newQty }, { item_id: id }], function (err) {
    if (err) throw err;
  });

  console.log('Thank you for your purchase. Your total is ' + total + '.');
}

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

function startApp() {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + ' ' + res[i].product_name + ' ' + res[i].price + ' ' + res[i].stock_quantity);
    }
    promptUser();
  });
}

connection.connect(function (err) {
  if (err) throw err;
  startApp();
});

