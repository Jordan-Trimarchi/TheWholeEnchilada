const pool = require('../database/index');

// need a /products route to query product table
const getProducts = (req, res) => {
  // need to be able to specify a count
  console.log(req);
  pool
    .connect()
    .then((client) => (
      client
        .query('select * from product')
        .then((results) => {
          client.release();
          res.send(results.rows);
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

const getProductInfo = (req, res) => {
  pool
    .connect()
    .then((client) => (
      client
        .query('select *, (select json_agg(features) from (select feature, value from features where product_id = product.id) features) as features from product where id = $1', [req.params.product_id])
        .then((results) => {
          client.release();
          res.send(results.rows);
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

const getProductStyles = (req, res) => {
  const { product_id } = req.params;
  pool
    .connect()
    .then((client) => (
      client
        .query(`select *, (select json_agg(photos) from (select url, thumbnail_url from photos where style_id = styles.id) photos) as photos,
        (select jsonb_object_agg(id, sku) from (select id, quantity, size from skus where style_id = styles.id) sku) as skus
         from styles where product_id = $1;`, [product_id])
        .then((results) => {
          client.release();
          const obj = {
            product_id: product_id,
            results: results.rows,
          };
          res.send(obj);
        })
        .catch((err) => {
          console.log('!!!!!!!!!!!!!!!');
          client.release();
          console.log(err.stack);
        })
    ));
};

// need /product/:product_id/related
// route to return array of all prod2 values in related where prod1 matches route.

const getRelatedProducts = (req, res) => {
  pool
    .connect()
    .then((client) => (
      client
        .query('select * from related where current_product_id = $1', [req.params.product_id])
        .then((results) => {
          client.release();
          res.send(results.rows);
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
