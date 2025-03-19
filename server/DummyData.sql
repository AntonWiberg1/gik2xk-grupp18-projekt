INSERT INTO `users` (email, password, first_name, last_name, created_at, updated_at) VALUES
('user1@example.com', 'password123', 'Alice', 'Anderson', NOW(), NOW()),
('user2@example.com', 'password123', 'Bob', 'Brown', NOW(), NOW()),
('user3@example.com', 'password123', 'Charlie', 'Clark', NOW(), NOW());

INSERT INTO `products` (title, description, price, image_url, created_at, updated_at) VALUES
('Laptop', 'A high-performance laptop', 1200.99, 'laptop.jpg', NOW(), NOW()),
('Headphones', 'Noise-cancelling headphones', 199.99, 'headphones.jpg', NOW(), NOW()),
('Smartphone', 'Latest model smartphone', 799.99, 'smartphone.jpg', NOW(), NOW());

INSERT INTO `carts` (id, user_id, payed, created_at, updated_at) VALUES
(12, 1, FALSE, NOW(), NOW()),
(21, 2, TRUE, NOW(), NOW()),
(15, 3, FALSE, NOW(), NOW());

INSERT INTO `cart_rows` (cart_id, product_id, amount, created_at, updated_at) VALUES
(12, 1, 1, NOW(), NOW()),
(12, 2, 2, NOW(), NOW()),
(21, 3, 1, NOW(), NOW()),
(15, 1, 3, NOW(), NOW()),
(15, 2, 1, NOW(), NOW());

INSERT INTO `ratings` (product_id, rating, created_at, updated_at) VALUES
(1, 4.5, NOW(), NOW()),
(2, 4.0, NOW(), NOW()),
(3, 4.8, NOW(), NOW()),
(1, 3.9, NOW(), NOW()),
(2, 4.2, NOW(), NOW());



SELECT * FROM carts;
SELECT * FROM ratings;
SELECT * FROM cart_rows;
SELECT * FROM products;
SELECT * FROM users;


DELETE FROM carts;
DELETE FROM ratings;
DELETE FROM cart_rows;
DELETE FROM products;
DELETE FROM users;

ALTER TABLE carts AUTO_INCREMENT = 1;
ALTER TABLE ratings AUTO_INCREMENT = 1;
ALTER TABLE cart_rows AUTO_INCREMENT = 1;
ALTER TABLE products AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;