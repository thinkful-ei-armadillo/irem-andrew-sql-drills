'use strict';

require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

function searchByQuery(query){
  knexInstance
    .select('name')
    .from('shopping_list')
    .where( 'name', 'ILIKE', `%${query}%`)
    .then(res => console.log(res));
}

searchByQuery('fish');