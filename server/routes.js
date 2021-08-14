const router = require('express').Router();
const {
  getProducts,
  getProductInfo,
  getProductStyles,
  getRelatedProducts,
} = require('./controllers');

router.get('', getProducts);
router.get('/:productId', getProductInfo);
router.get('/:productId/styles', getProductStyles);
router.get('/:productId/related', getRelatedProducts);

module.exports = router;
