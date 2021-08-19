const { Pool } = require('pg');

const connection = new Pool({
  user: 'jordant.',
  host: '18.191.224.181',
  database: 'product_overview',
  password: 'jordant',
  port: 3002,
});
module.exports = connection;
