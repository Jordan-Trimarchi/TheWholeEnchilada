const router = require('express').Router();
const {
  getProducts,
  getProductInfo,
  getProductStyles,
  getRelatedProducts,
} = require('./controllers');

router.get('', getProducts);
router.get('/:product_id', getProductInfo);
router.get('/:product_id/styles', getProductStyles);
router.get('/:product_id/related', getRelatedProducts);

module.exports = router;
