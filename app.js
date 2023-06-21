const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const user = require('./routes/userRoute');
const restaurant = require('./routes/restaurantRoute');

app.use('/',user);
app.use('/',restaurant);

app.use(errorMiddleware);

module.exports = app;