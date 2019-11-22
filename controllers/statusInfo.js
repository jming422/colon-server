const db = require('../db');

//----- ***** -----
// PRETTY PLEASE validate parameters before passing into these functions!
//----- ***** -----

module.exports.getStatus = async (location) => {
  // This function lets thrown errors go above so that the route handler can decide
  // what it should return in the event of an error
  let out = null;

  const client = await db.getPool().connect();

  const result = await client.query({ text: 'SELECT status FROM door_status WHERE location = $1', values: [location] });
  out = result.rows[0];

  client.release();

  return out;
};

module.exports.saveStatus = async (location, status) => {
  console.log(`Saving to database: ${location} -> ${status}`);

  const client = await db.getPool().connect();

  await client.query({
    text: 'INSERT INTO door_status(location, status) VALUES ($1, $2)',
    values: [location, status],
  });

  client.release();
};
