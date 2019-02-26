const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe('Shopping list service object', function(){
    let db
    before(() =>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    })
})
