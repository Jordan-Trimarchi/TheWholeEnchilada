const path = require('path');
const express = require('express'); // npm installed
const axios = require('axios');

const API_KEY = require('./config');
const { getProducts, getProductInfo, getProductStyles, getRelatedProducts } = require('./services');
const baseUrl = 'http://localhost:3000';
const PORT = 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

getProductStyles(23);

// getRelatedProducts(500381);
