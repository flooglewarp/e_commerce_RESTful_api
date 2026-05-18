CREATE table users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE table products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL
);

CREATE table orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE table user_carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- sample data
INSERT INTO users (name, email, password) VALUES ('John Doe', 'john.doe@example.com', 'password123');
INSERT INTO products (name, description, price) VALUES ('Laptop', 'A high-performance laptop', 999.99);
INSERT INTO orders (user_id, product_id, quantity) VALUES (1, 1, 1);
INSERT INTO user_carts (user_id, product_id, quantity) VALUES (1, 1, 2);