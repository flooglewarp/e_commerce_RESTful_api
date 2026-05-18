const express = require('express');
const pool = require('../db');
const productsRouter = express.Router();

// Define routes for products
productsRouter.get('/', async (req, res) => {
  // Logic to get all products
  try {
    const result = await pool.query("SELECT * FROM products;");
    res.status(200).json(result.rows);
  } catch(err) {
    res.status(500).json({ error: 'Internal server error, failed to get all products'});
  } 
});

productsRouter.post('/', async (req, res) => {
  // Logic to create a new product
  try {
    //Request object destructure the body
    const { name, description, price } = req.body;
    //query the databse with SQL, store in result variable
    const result = await pool.query('INSERT INTO products(name, description, price) VALUES ($1, $2, $3) RETURNING *', [name, description, price]);
    res.status(201).json(result.rows[0]);
  } catch(err) {
    res.status(500).json({error: 'Server error, failed to create new product'});
  }

});

productsRouter.get('/:id', async (req, res) => {
  // Logic to get a specific product by ID 
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length == 0) {
      res.status(404).json({error: 'Product not found'});
    } else {
      res.status(200).json(result.rows);
    }
  } catch(err) {
    res.status(500).json({error: 'Server error, failed to find product'});
  }
});

productsRouter.put('/:id', async (req, res) => {
  // Logic to update a specific product by ID
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const result = await pool.query('UPDATE products SET name = $1, description=$2, price=$3 WHERE id=$4 RETURNING *;', [name, description, price, id]);
    if (result.rows.length === 0) {
      res.status(404).json({error: 'Failed to update, product not found'});
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch(err) {
    res.status(500).json({error: 'Server error, failed to update product'});
  } 
});

productsRouter.delete('/:id', async (req, res) => {
  // Logic to delete a specific product by ID 
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *;', [id]);
    res.status(204).json({ message: 'Product deleted successfully'});
  } catch(err) {
    res.status(500).json({error: 'Server error, failed to delete product'});
  }
});

module.exports = productsRouter;