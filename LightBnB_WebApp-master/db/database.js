const properties = require("./json/properties.json");
const users = require("./json/users.json");

//Setting up js postgres
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {})


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {

  return pool
    .query(
      `SELECT * FROM users WHERE email = $1;`, [email])
    .then((result) => {
      if(result.rows.length===0){
        return null
      }
      return(result.rows[0])
    })
    .catch((err) => {
      console.log(err.message);
    });

};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(
      `SELECT * FROM users WHERE id = $1;`, [id])
    .then((result) => {
      if(result.rows.length===0){
        return null
      }
      return(result.rows[0])
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(
      `INSERT INTO users (name, password, email) VALUES ($1, $2, $3);`, [user.name, user.password, user.email])
    .then(() => {
      console.log(user)
      return getUserWithEmail(user.email)
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT * FROM reservations
      JOIN properties ON properties.id=reservations.property_id
      WHERE guest_id = $1
      LIMIT $2
      ;`, [guest_id, limit])
    .then((result) => {
      if(result.rows.length===0){
        return null;
      }
      return result.rows;

    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  // 1
  const ratingArray =[];
  const queryParams = [];

  let whereVar = false;

  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
    whereVar=true;
  }

  if(options.minimum_price_per_night && options.maximum_price_per_night){
    queryParams.push(options.minimum_price_per_night);
    queryParams.push(options.maximum_price_per_night);
    if(whereVar===false){
      queryString += `WHERE cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`
      whereVar = true;
    }
    queryString += ` AND cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`
  }

  if(options.minimum_price_per_night && options.maximum_price_per_night===""){
    queryParams.push(options.minimum_price_per_night);
    if(whereVar===false){
      queryString += `WHERE cost_per_night > $${queryParams.length} `;
      whereVar = true;
    }if(options.city){
      queryString += ` AND cost_per_night > $${queryParams.length} `;
    }
  }

  if(options.minimum_price_per_night==="" && options.maximum_price_per_night){
    queryParams.push(options.maximum_price_per_night);
    if(whereVar===false){
    queryString += `WHERE cost_per_night < $${queryParams.length} `;
    whereVar = true 
  }if(options.city){
    queryString += ` AND cost_per_night < $${queryParams.length} `;
  }
  }
  queryString += `
  GROUP BY properties.id, properties.title, properties.owner_id, properties.city, properties.cost_per_night`;


if(options.minimum_rating != ""){

  queryParams.push(options.minimum_rating);
  queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
}


// console.log(queryString)
// console.log(queryParams)

  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  console.log(queryString)
  // 5
  // console.log("queryString:", queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = function (property) {
  const queryParams = [];
  const insertColumns = [];
  const insertValues = [];

  for (const key in property) {
    queryParams.push(property[key]);
    insertColumns.push(key);
    insertValues.push(`$${queryParams.length}`);
  }
const queryString = `
    INSERT INTO properties (${insertColumns.join(', ')})
    VALUES (${insertValues.join(', ')})
    RETURNING *;
  `;

  return pool.query(queryString, queryParams)
    .then((res) => res.rows[0])
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};


module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
