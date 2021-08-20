const { Pool } = require('pg');

const connection = new Pool({
  user: 'jordant.',
  host: '18.216.104.2',
  database: 'product_overview',
  password: 'jordant',
  port: 3001,
});
module.exports = connection;
