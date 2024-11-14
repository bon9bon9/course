const express = require('express');
const cors = require('cors');
const app = express();


// CORS 설정: 클라이언트에서 오는 요청만 허용
const corsOptions = {
  origin: 'http://localhost:3000', // 프론트엔드 URL을 명시
  credentials: true, // 자격 증명(쿠키 등)을 포함하려면 true로 설정
};
app.use(cors(corsOptions)); // 모든 요청에 대해 CORS 허용

const dotenv = require('dotenv');
dotenv.config();

app.listen(3939);
console.log(process.env.PORT);

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

const categoryRouter = require('./routes/category');
app.use("/category", categoryRouter);