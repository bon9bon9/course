const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);

const booksRouter = require('./routes/books');
app.use("/books", booksRouter);

const cartsRouter = require('./routes/carts');
app.use("/carts", cartsRouter);

const likesRouter = require('./routes/likes');
app.use("/likes", likesRouter);

const ordersRouter = require('./routes/orders');
app.use("/orders", ordersRouter);

const usersRouter = require('./routes/users');
app.use("/users", usersRouter);