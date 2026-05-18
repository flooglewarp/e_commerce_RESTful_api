const express = require('express');
const pool = require('../db');
const userCartRouter = express.Router();

userCartRouter.get('/:user_id', async (req, res) => {
    //Get all orders for user_id
    try {
        const { user_id } = req.params;
        const result = await pool.query('SELECT * FROM user_carts WHERE user_id=$1 RETURNING *', [user_id]);
        if(result.rows.length === 0) {
            res.status(404).json({message: 'No items found for user'});
        } else {
            res.status(201).json(result.rows);
        }

    } catch(err) {
        res.status(500).json({error: 'Server failed to get items for user_id'});
    }
});

userCartRouter.get('/:id', async (req, res) => {
    //get specific cart item for specific user_id
    try {
        const { id } = req.params;
        const { user_id, product_id, quantity } = req.body;
        const result = await pool.query('SELECT * FROM user_carts WHERE id=$1 RETURNING *', [ id ]);

        if(result.rows.length === 0) {
            res.status(404).json({ message: 'No cart item found'});
        } else {
            res.status(201).json(result.rows[0]);
        }
    } catch(err) {
        res.status(500).json({error: 'Server failed to get cart_item'});
    }
})

