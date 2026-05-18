const express = require('express');
const pool = require('../db');
const ordersRouter = express.Router();

// Define routes for orders
ordersRouter.get('/', async (req, res) => {
  // Logic to get all orders
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

ordersRouter.post('/', async (req, res) => {
  // Logic to create a new order
  try {
    const { user_id, product_id, quantity } = req.body;
    const result = await pool.query(
      'INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [user_id, product_id, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
ordersRouter.get('/:id', async (req, res) => {
  // Logic to get a specific order by ID
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


ordersRouter.put('/:id', async (req, res) => {
  // Logic to update a specific order by ID
    try {
    const { id } = req.params;
    const { user_id, product_id, quantity } = req.body;
    const result = await pool.query(
      'UPDATE orders SET user_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [user_id, product_id, quantity, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

ordersRouter.delete('/:id', async (req, res) => {
  // Logic to delete a specific order by ID
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = ordersRouter;