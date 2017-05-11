// requires used node packages
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('easy-table');

// sets up connection to the mySQL database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bamazon'
});

// view total sales of each dept
function viewSales() {
  var query = 'SELECT * FROM departments';
  var t = new Table();

  connection.query(query, function (err, res) {
    if (err) throw err;
    res.forEach(function (tbl) {
      var totalProfit = tbl.total_sales - tbl.over_head_costs;
      t.cell('Dept ID', tbl.department_id);
      t.cell('Name', tbl.department_name);
      t.cell('Over Head Costs', tbl.over_head_costs, Table.number(2));
      t.cell('Product Sales', tbl.total_sales, Table.number(2));
      t.cell('Total Profit', totalProfit, Table.number(2));
      t.newRow();
    });
    console.log(t.toString());
    connection.end();
  });
}

// allows user to add new dept
function newDept() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Department Name:',
      name: 'department_name'
    },
    {
      type: 'input',
      message: 'Over Head Costs:',
      name: 'over_head_costs',
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
    }
  ]).then(function (answer) {
    var query = 'INSERT INTO departments SET ?';
    var department = {
      department_name: answer.department_name,
      over_head_costs: parseFloat(answer.over_head_costs),
      total_sales: 0
    };

    connection.query(query, department, function (err) {
      if (err) throw err;
      console.log('Department added!');
      connection.end();
    });
  });
}

// initializes app
function startApp() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Please choose and option below:',
      choices: ['View Product Sales By Department', 'Create New Department'],
      name: 'choice'
    }
  ]).then(function (answer) {
    if (answer.choice === 'View Product Sales By Department') {
      viewSales();
    } else {
      newDept();
    }
  });
}

// connects to mySQL server and starts app if no errors are thrown.
connection.connect(function (err) {
  if (err) throw err;
  startApp();
});
