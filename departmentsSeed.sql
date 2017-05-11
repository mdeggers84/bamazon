USE bamazon;

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs DECIMAL(10,2) DEFAULT 0,
  total_sales DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY(department_id)
);

INSERT INTO departments
  (department_name, over_head_costs, total_sales)
VALUES
  ('Apparel', 15, 0),
  ('Electronics', 75, 0),
  ('Entertainment', 25, 0),
  ('Toys', 10, 0);
