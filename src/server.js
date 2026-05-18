const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json()); // Middleware to parse JSON request bodies

//import and mount each route 

const productsRouter = require('./routes/productsRouter');
app.use('/routes/products', productsRouter);

const usersRouter = require('./routes/usersRouter');
app.use('/routes/users', usersRouter);

const ordersRouter = require('./routes/ordersRouter');
app.use('/routes/orders', ordersRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app };   