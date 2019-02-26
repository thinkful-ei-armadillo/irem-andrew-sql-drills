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

// searchByQuery('fish');

function paginateItems(page){
  const itemsPerPage = 6
  const offset = itemsPerPage * (page - 1)
  knexInstance
    .select('id', 'name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(res => console.log(res))
}

// paginateItems(2)

function getItemsByDate(daysAgo){
  knexInstance
    .select('id', 'name')
    .from('shopping_list')
    .where(
      'date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(res => console.log(res))
}

//getItemsByDate(4)

function getTotalCost(){
  knexInstance
    .select('category')
    .from('shopping_list')
    .groupBy('category')
    .sum('price')
    .then(res => console.log(res))
}

getTotalCost();