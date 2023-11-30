const express = require('express');
const path = require('path');
const app = express();
// const productRouter = require('./app/product/routes');
const productRouterV2 = require('./app/productV2/routes');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);
app.use(express.static('uploads'));

app.listen(3306, () => console.log('Server: http://localhost:3306'))