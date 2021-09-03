const express = require('express');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['skldajfhskladjfhds23'] }));
app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log('Listening...');
});