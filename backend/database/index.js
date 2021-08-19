const { Pool } = require('pg');

const connection = new Pool({
  user: 'jordant.',
  host: 'sdc-postgres',
  database: 'product_overview',
  password: 'jordant',
  port: 5432,
});
module.exports = connection;
