const logger = require('morgan');
const express = require('express');
const path = require('path');
const app = express();
const productRouterV2 = require('./app/productV2/routes');
// const productRouter = require('./app/product/routes');

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Setup public uploads.
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('uploads'));

// Main APis.
// app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);

// Start server runner.
app.listen(3000, () => console.log('Server: http://localhost:3000'))