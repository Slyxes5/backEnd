const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'Sly114141',
  host: 'localhost',
  port: 5432,
  database: 'backend'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};