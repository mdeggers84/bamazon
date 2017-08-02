# bamazon

## Bamazon!

### Quick Start
* Run Customer App: `npm run customer`
* Run Manager App: `npm run manager`
* Run Supervisor App: `npm run supervisor`


### bamazonCustomer.js
On running the app, user is presented with a screen listing all items currently for sale.
Customer must use a positive number when selecting both the item and quantity.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971263/a7e5a6c0-3669-11e7-8bc2-2214ed0068ff.png "Initial Customer Screen")

### bamazonManager.js
User is presented with the 4 options available in the manager program.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971261/a7e4eba4-3669-11e7-9bf9-7c0c62bfb655.png "Manager Selection")

**View Products for Sale** shows current list of all products for sale.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971260/a7e3c0d0-3669-11e7-8e81-369cacf4e26a.png "View Products For Sale")

**View Low Inventory** shows all products with an inventory less than or equal to 5.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971264/a7e652d2-3669-11e7-9836-ee1186dbd6a8.png "View Low Inventory")

**Add to Inventory** allows user to add to the stock of an item.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971262/a7e56732-3669-11e7-933b-68c14ad7870c.png "Add to Inventory")

User selects the item id of the product they want to restock and then enters a value of amount to add.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971265/a7e76424-3669-11e7-95bc-bb3c60e50be3.png "Restock Products")

**Add New Product** allows user to enter a completely new product.
The department is presented by a list of availabe departments.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971268/a7f6c39c-3669-11e7-8247-da342f16fb40.png "Add New Product List")

The final entry is then uploaded to the **departments** table.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971267/a7f68f6c-3669-11e7-96bb-5d43cb518e0a.png "Add New Product Entry")

### bamazonSupervisor.js
The Supervisor menu allows the user to **View Product Sales By Department** or **Create New Department**.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971269/a7f8bfe4-3669-11e7-9b1b-d7b3c1905a43.png "Supervisor Menu")

Viewing the product sales displays a table of all departments, their overhead costs, product sales for each product belonging to that category, and finally a computed profit based on total sales and overhead costs.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971271/a7fc42fe-3669-11e7-8bb4-6d6e97f1ac8b.png "Product Sales")

**Create New Department** allows the user to create a department that can then be used when adding a new product via the bamazonManager app.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971270/a7f9a94a-3669-11e7-9467-1db89751e312.png "Create Dept")

**departments** table in mySQL.

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971272/a7fd4c1c-3669-11e7-8121-2709b48fc6d1.png "departments table")

**products** table in mySQL

![alt text](https://cloud.githubusercontent.com/assets/22500207/25971273/a8063e1c-3669-11e7-993a-c9d377b1a00f.png "products table")

