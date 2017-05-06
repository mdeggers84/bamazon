-- CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(11) NOT NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO products
  (product_name, department_name, price, stock_quantity)
VALUES
  ('Bicycle', 'Toys', 500, 10),
  ('Boots', 'Shoes', 50, 12),
  ('Black T-Shirt', 'Apparel', 12.95, 20),
  ('Mass Effect: Andromeda', 'Video Games', 59.99, 5),
  ('Guardians of The Galaxy', 'Movies', 19.99, 15),
  ('Dress Shoes', 'Shoes', 30, 8),
  ('Resident Evil 7', 'Video Games', 59.99, 2),
  ('Crockpot', 'Appliances', 100, 22),
  ('Toaster', 'Appliances', 12, 13),
  ('Sloth', 'Toys', 3.14, 42);
