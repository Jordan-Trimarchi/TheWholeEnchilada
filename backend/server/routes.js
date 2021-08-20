const router = require('express').Router();
const {
  getProducts,
  getProductInfo,
  getProductStyles,
  getRelatedProducts,
  targetVerify,
} = require('./controllers');

router.get('/products', getProducts);
router.get('/products/:product_id', getProductInfo);
router.get('/products/:product_id/styles', getProductStyles);
router.get('/products/:product_id/related', getRelatedProducts);
router.get('/loaderio-d0458cbc2ea5b187ae4d1d93e06398c8', targetVerify);

module.exports = router;
