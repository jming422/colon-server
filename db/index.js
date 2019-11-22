const { Pool } = require('pg');

let pool = null;

module.exports.initDb = () => {
  try {
    pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: true });
    console.log('Successfully established database connection.');
    return true;
  } catch (err) {
    console.error('ERROR ESTABLISHING DATABASE CONNECTION');
    console.error(err);
    return false;
  }
};

module.exports.getPool = () => pool;
