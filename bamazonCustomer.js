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
function completeOrder(id, qty, stock, price, dept, pSales, dSales) {
  var newQty = stock - qty;
  var currTotal = price * qty;
  var productSales = pSales + currTotal;
  var deptSales = dSales + currTotal;

  connection.query('UPDATE products SET ? WHERE ?', [
    { stock_quantity: newQty, product_sales: productSales }, { item_id: id }], function (err) {
      if (err) throw err;
    });

  connection.query('UPDATE departments SET ? WHERE ?', [
    { total_sales: deptSales }, { department_name: dept }
  ], function (err) {
    if (err) throw err;
  });


  console.log('Thank you for your purchase. Your total is $' + currTotal.toFixed(2) + '.');
}

// checks if there are enough items in inv to complete purchase
// if there are, completes the order. If not, restarts program.
function invCheck(id, qty) {
  var query = 'SELECT * FROM products LEFT JOIN departments ON products.department_name = departments.department_name WHERE ?';
  connection.query(query, { item_id: id }, function (err, res) {
    if (err) throw err;
    if (res[0].stock_quantity < qty) {
      console.log('Insufficient quantity!');
      promptUser();
    } else {
      completeOrder(id, qty, res[0].stock_quantity, res[0].price, res[0].department_name, res[0].product_sales, res[0].total_sales);
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
        pattern: /^[1-9][0-9]*$/,
        message: 'You must choose a number.'
      },
      qty: {
        description: 'How many would you like to purchase?',
        pattern: /^[1-9][0-9]*$/,
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
    var table = new Table();
    if (err) throw err;
    res.forEach(function (product) {
      table.cell('Item ID', product.item_id);
      table.cell('Name', product.product_name);
      table.cell('Dept. Name', product.department_name);
      table.cell('Price', product.price, Table.number(2));
      table.cell('Qty', product.stock_quantity, Table.number(0));
      table.newRow();
    });
    console.log(table.toString());
    promptUser();
  });
}

// connects to mySQL server and starts app if no errors are thrown.
connection.connect(function (err) {
  if (err) throw err;
  startApp();
});

