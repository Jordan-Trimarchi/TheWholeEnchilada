const pool = require('../database/index');

// need a /products route to query product table
const getProducts = () => {
  // need to be able to specify a count
  pool
    .connect()
    .then((client) => (
      client
        .query('select * from product')
        .then((res) => {
          client.release();
          console.log(res.rows);
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        })
    ));
};

// need /products/:product_id route to return info from product table where the ID matches route,
// and with features as an array populated with objects containing feature and value from features
// table where product ID matches route

const getProductInfo = (productId) => {
  pool
    .connect()
    .then((client) => (
      client
        .query('select * from product where id = $1', [productId])
        .then((res) => {
          client.release();
          console.log(res.rows);
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        })
    ));
};

// need /products/:product_id/styles route to return an object with prod_id and results:
// an array of objects each corresponding to a row in the styles table where prod_id mathces route.
// each style object containing photos: an array of objects containing the urls to photos contained
// in any rows of photos table where style_id matches the style_id of the containing object
// each style object containing a skus object of objects, including quantity and size values.
// the keys of which are skus pertaining to the style of containing objects.

const getProductStyles = (productId) => {
  pool
    .connect()
    .then((client) => (
      client
        .query('select * from styles where product_id = $1', [productId])
        .then((res) => {
          client.release();
          console.log(res.rows);
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        })
    ));
};

// need /product/:product_id/related
// route to return array of all prod2 values in related where prod1 matches route.

const getRelatedProducts = (productId) => {
  pool
    .connect()
    .then((client) => (
      client
        .query('select * from related where current_product_id = $1', [productId])
        .then((res) => {
          client.release();
          console.log(res.rows);
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        })
    ));
};
module.exports = {
  getProducts,
  getProductInfo,
  getProductStyles,
  getRelatedProducts,
};
