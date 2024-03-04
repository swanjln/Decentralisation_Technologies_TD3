CREATE TABLE product (
    productId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE user (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE cart (
    cartId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(userId)
);

CREATE TABLE cartitem (
    cartId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cartId) REFERENCES cart(cartId),
    FOREIGN KEY (productId) REFERENCES product(productId)
);

CREATE TABLE orders (
    orderId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES user(userId)
);

CREATE TABLE orderitem (
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(orderId),
    FOREIGN KEY (productId) REFERENCES product(productId)
);



-- Inserting data into the product table
INSERT INTO "Product" ("productId", "productName", "description", "category", "price", "stock")
VALUES (1, 'Product 1', 'Description for Product 1', 'Category A', 10.99, 100),
       (2, 'Product 2', 'Description for Product 2', 'Category B', 19.99, 50),
       (3, 'Product 3', 'Description for Product 3', 'Category A', 8.50, 75);

-- Inserting data into the user table
INSERT INTO "User" ("userId", "username", "password", "email")
VALUES (1, 'user1', 'password1', 'user1@example.com'),
       (2, 'user2', 'password2', 'user2@example.com'),
       (3, 'user3', 'password3', 'user3@example.com');

-- Inserting data into the cart table
INSERT INTO "Cart" ("cartId", "userId")
VALUES (1, 1),  -- Assigning cartId 1 to user with userId 1
       (2, 2); -- Assigning cartId 2 to user with userId 2

-- Inserting data into the cartitem table
INSERT INTO "CartItem" ("cartId", "productId", "quantity", "price")
VALUES (1, 1, 2, 21.98),  -- Adding 2 units of Product 1 to cart with cartId 1
       (1, 2, 1, 19.99),  -- Adding 1 unit of Product 2 to cart with cartId 1
       (2, 3, 3, 25.50);  -- Adding 3 units of Product 3 to cart with cartId 2

-- Inserting data into the orders table
INSERT INTO "Orders" ("orderId", "cartId", "orderDate")
VALUES (1, 1, CURRENT_TIMESTAMP),  -- Creating an order with orderId 1 for cart with cartId 1 and current timestamp
       (2, 2, CURRENT_TIMESTAMP);  -- Creating an order with orderId 2 for cart with cartId 2 and current timestamp

INSERT INTO "OrdersItem" ("ordersId", "productId", "quantity", "price")
VALUES (1, 1, 2, 21.98),  -- Adding 2 units of Product 1 to cart with cartId 1
       (1, 2, 1, 19.99),  -- Adding 1 unit of Product 2 to cart with cartId 1
       (2, 3, 3, 25.50);  -- Adding 3 units of Product 3 to cart with cartId 2
